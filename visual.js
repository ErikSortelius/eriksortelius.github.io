function random(low, high) {
    return Math.random() * (high - low) + low;
}

// Perlin Noise Function
function noise(x) {
    return Math.sin(x * 0.1) * 0.5 + Math.cos(x * 0.07) * 0.5;
}

class Visual {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.context = this.canvas.getContext('2d');
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.particleLength = 150;
        this.oppositeParticleLength = 20;
        this.particles = [];
        this.oppositeParticles = [];
        this.particleMaxSize = 10;

        this.handleResizeBind = this.handleResize.bind(this);

        this.initialize();
        this.render();
    }

    initialize() {
        this.resizeCanvas();
        for (let i = 0; i < this.particleLength; i++) {
            this.particles.push(this.createParticle(i, false));
        }
        for (let i = 0; i < this.oppositeParticleLength; i++) {
            this.oppositeParticles.push(this.createParticle(i, true));
        }
        this.bind();
    }

    bind() {
        window.addEventListener('resize', this.handleResizeBind, false);
    }

    unbind() {
        window.removeEventListener('resize', this.handleResizeBind, false);
    }

    handleResize() {
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvasWidth = document.body.offsetWidth;
        this.canvasHeight = document.body.offsetHeight;
        this.canvas.width = this.canvasWidth * window.devicePixelRatio;
        this.canvas.height = this.canvasHeight * window.devicePixelRatio;
        this.context = this.canvas.getContext('2d');
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    createParticle(id, isOpposite) {
        const size = random(1, this.particleMaxSize);
        const x = random(0, this.canvasWidth);
        let y = random(this.canvasHeight / 2 - 150, this.canvasHeight / 2 + 150);
        y += random(-100, 100);
        const alpha = random(0.05, 0.2); // Reduced alpha for subtler effect
        const speed = (alpha + 0.1) * 0.4; // Slower movement

        return {
            id: id,
            x: x,
            y: y,
            startY: y,
            size: size,
            alpha: alpha,
            color: { r: 33, g: 150, b: 243 }, // Changed to blue theme
            speed: speed,
            amplitude: random(50, 200),
            isOpposite: isOpposite
        };
    }

    drawParticles() {
        [...this.particles, ...this.oppositeParticles].forEach(particle => {
            this.moveParticle(particle);
            this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
            this.context.fillRect(particle.x, particle.y, particle.size, particle.size);
        });
    }

    moveParticle(particle) {
        particle.x += particle.speed;
        particle.y = particle.startY + particle.amplitude * noise(particle.x * 0.02) * (particle.isOpposite ? -5 : 5);
    }

    render() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.drawParticles();

        [...this.particles, ...this.oppositeParticles].forEach(particle => {
            if (particle.x - particle.size >= this.canvasWidth) {
                if (particle.isOpposite) {
                    this.oppositeParticles[particle.id] = this.createParticle(particle.id, true);
                } else {
                    this.particles[particle.id] = this.createParticle(particle.id, false);
                }
            }
        });

        requestAnimationFrame(this.render.bind(this));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Visual();
});