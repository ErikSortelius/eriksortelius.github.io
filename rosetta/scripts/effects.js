class ScoreText {
    constructor(gameBoard, score) {
        this.gameBoard = gameBoard;
        this.score = score;
        this.init();
    }

    init() {
        const container = document.createElement('div');
        container.className = 'score-text-container';
        this.container = container;
        this.gameBoard.appendChild(container);

        const text = document.createElement('div');
        text.className = 'score-text';
        text.textContent = `+${this.score}`;
        container.appendChild(text);
        this.textElement = text;

        this.animate();
    }

    animate() {
        // Start with zero opacity to avoid flash
        this.textElement.style.opacity = '0';

        requestAnimationFrame(() => {
            this.textElement.style.animation = 'fadeInScore 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        });

        // Match tile fadeout timing (0.2s animation, removed after fadeout)
        setTimeout(() => {
            this.textElement.style.animation = 'fadeOut 0.2s ease-out forwards';
            setTimeout(() => {
                this.container.remove();
            }, 200);
        }, 1800);
    }

    static show(gameBoard, score) {
        return new ScoreText(gameBoard, score);
    }
}

class HolographicCard {
    constructor(element) {
        this.element = element;
        this.styleElement = document.createElement('style');
        document.head.appendChild(this.styleElement);
        this.bindEvents();
        this.isPlayingCard = element.classList.contains('playing-card');
    }

    bindEvents() {
        this.element.addEventListener('mousemove', (e) => this.handleMove(e));
        this.element.addEventListener('mouseleave', () => this.handleLeave());
        this.element.addEventListener('touchmove', (e) => this.handleMove(e));
        this.element.addEventListener('touchend', () => this.handleLeave());
    }

    handleMove(e) {
        const rect = this.element.getBoundingClientRect();
        const l = e.type === 'touchmove' ?
            e.touches[0].clientX - rect.left :
            e.offsetX;
        const t = e.type === 'touchmove' ?
            e.touches[0].clientY - rect.top :
            e.offsetY;

        const h = this.element.offsetHeight;
        const w = this.element.offsetWidth;
        const px = Math.abs(Math.floor(100 / w * l) - 100);
        const py = Math.abs(Math.floor(100 / h * t) - 100);
        const pa = (50 - px) + (50 - py);

        // Calculate positions
        const lp = (50 + (px - 50) / 1.5);
        const tp = (50 + (py - 50) / 1.5);
        const px_spark = (50 + (px - 50) / 7);
        const py_spark = (50 + (py - 50) / 7);
        const p_opc = 20 + (Math.abs(pa) * 1.5);
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * .5;

        // Update styles with class-specific selector
        const cardClass = this.isPlayingCard ? 'playing-card' : 'pack-card';
        this.styleElement.textContent = `
            .${cardClass}:hover:before { background-position: ${lp}% ${tp}%; }
            .${cardClass}:hover:after { background-position: ${px_spark}% ${py_spark}%; opacity: ${p_opc / 100}; }
        `;

        // Adjust transform origin and values for better 3D effect on playing cards
        if (this.isPlayingCard) {
            this.element.style.transformOrigin = 'center';
            this.element.style.transform = `
                perspective(1200px)
                rotateX(${ty}deg) 
                rotateY(${tx}deg)
                translateZ(0)
            `;
        } else {
            this.element.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;
        }
    }

    handleLeave() {
        this.styleElement.textContent = '';
        // Different reset transform for playing cards
        this.element.style.transform = this.isPlayingCard ? 'translateZ(0)' : '';
    }

    static apply(element) {
        return new HolographicCard(element);
    }
}

// Fix duplicate global assignments - keep only these ones at the end
window.ScoreText = ScoreText;
window.HolographicCard = HolographicCard;