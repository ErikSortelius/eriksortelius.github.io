export class ScoreAnimator {
    constructor() {
        this.overlay = null;
        this.scoreDisplay = null;
        this.currentScore = 0;
        this.initializeOverlay();
    }

    initializeOverlay() {
        if (!document.querySelector('.scoring-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'scoring-overlay';
            overlay.innerHTML = `
                <div class="score-container">
                    <div class="score-operation"></div>
                    <div class="score-display">0</div>
                    <div class="score-step"></div>
                </div>
            `;
            document.body.appendChild(overlay);
            this.overlay = overlay;
            this.scoreDisplay = overlay.querySelector('.score-display');
            this.stepDisplay = overlay.querySelector('.score-step');
            this.operationDisplay = overlay.querySelector('.score-operation');
        }
    }

    async animateScore(scoreData) {
        this.overlay.classList.add('active');
        this.currentScore = 0;

        // Remove any previous 'scored' classes
        document.querySelectorAll('.game-board .tile').forEach(tile => {
            tile.classList.remove('scored');
        });

        // Add temporary IDs to tiles for animation
        document.querySelectorAll('.game-board .tile').forEach((tile, index) => {
            tile.id = `scoring-tile-${index}`;
        });

        // Process each scoring step
        for (const step of scoreData.scoreSteps) {
            switch (step.type) {
                case 'tile':
                    await this.animateTileScore(step);
                    break;
                case 'multiplier':
                    await this.animateMultiplier(step);
                    break;
                case 'card':
                    await this.animateCardEffect(step);
                    break;
            }
        }

        // Clean up temporary IDs
        document.querySelectorAll('.game-board .tile[id^="scoring-tile-"]').forEach(tile => {
            tile.removeAttribute('id');
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.overlay.classList.remove('active');

        // Add scoring log output
        console.group('Score Breakdown');
        console.log('Final Score:', scoreData.finalScore);
        console.log('Base Score:', scoreData.baseScore);
        console.log('\nScoring Steps:');
        scoreData.scoreSteps.forEach((step, index) => {
            switch (step.type) {
                case 'tile':
                    console.log(`${index + 1}. Tile ${step.letter}: ${step.points} → ${step.finalPoints} ${step.description} (Total: ${step.total})`);
                    break;
                case 'wordMultiplier':
                    console.log(`${index + 1}. Word Multiplier ×${step.multiplier}: ${step.beforePoints} → ${step.afterPoints}`);
                    break;
                case 'card':
                    console.log(`${index + 1}. Card Type ${step.cardName}: ${step.operation === 'multiply' ? '×' : '+'}${step.value} (Total: ${step.total})`);
                    break;
            }
        });
        console.groupEnd();
    }

    async animateTileScore(step) {
        // If it's a special tile effect, just show final points added
        if (step.effectType) {
            this.showOperation('+', step.finalPoints);
            await this.updateScoreWithAnimation(step.total);
            await new Promise(resolve => setTimeout(resolve, 300));
            return;
        }

        // Regular tile scoring with highlight
        const tiles = document.querySelectorAll('.game-board .tile');
        const matchingTiles = Array.from(tiles).filter(t =>
            t.querySelector('.letter').textContent === step.letter &&
            !t.classList.contains('scored')
        );

        if (matchingTiles.length > 0) {
            const tileToHighlight = matchingTiles[0];
            tileToHighlight.classList.add('scored');
            tileToHighlight.classList.add('highlight');

            this.showOperation('+', step.points);
            await this.updateScoreWithAnimation(step.total);
            tileToHighlight.classList.remove('highlight');
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    async animateMultiplier(step) {
        this.showOperation('×', step.value);
        await this.updateScoreWithAnimation(step.total);
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    async animateCardEffect(step) {
        // No need to convert, use type directly from CardData.CARD_TYPES
        const cardType = step.cardName; // cardName is now the card type

        // Debug logging to track card selection
        console.debug('Card Animation:', {
            type: step.type,
            cardType: cardType,
            operation: step.operation,
            value: step.value,
            selector: `.playing-card[data-type="${cardType}"]`
        });

        const card = document.querySelector(`.playing-card[data-type="${cardType}"]`);

        if (card) {
            card.classList.add('highlight');
            this.showOperation(
                step.operation === 'multiply' ? '×' : '+',
                step.value,
                step.operation === 'multiply'
            );
            await this.updateScoreWithAnimation(step.total);
            card.classList.remove('highlight');
        } else {
            console.warn('Card not found:', cardType);
        }
        await new Promise(resolve => setTimeout(resolve, 600));
    }

    async showInvalidWord() {
        this.overlay.classList.add('active');
        this.scoreDisplay.classList.add('invalid');
        this.operationDisplay.innerHTML = ``;
        this.scoreDisplay.textContent = "Invalid Word";

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.overlay.classList.remove('active');
        this.scoreDisplay.classList.remove('invalid');
        this.scoreDisplay.textContent = '';
    }

    showOperation(type, value, isMultiply = false) {
        this.operationDisplay.innerHTML = `
            <span class="operation-symbol${isMultiply ? ' multiply' : ''}">${type}</span>
            <span class="operation-value">${value}</span>
        `;
        this.operationDisplay.classList.add('active');
    }

    hideOperation() {
        this.operationDisplay.classList.remove('active');
    }

    async updateScoreWithAnimation(newScore) {
        const start = this.currentScore;
        const end = parseInt(newScore);
        const duration = 300;
        const startTime = performance.now();

        return new Promise(resolve => {
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const current = Math.floor(start + (end - start) * progress);
                this.scoreDisplay.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.currentScore = end;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    updateScore(newScore) {
        this.currentScore = newScore;
        this.scoreDisplay.textContent = newScore;
        this.scoreDisplay.classList.add('highlight-pulse');
        setTimeout(() => {
            this.scoreDisplay.classList.remove('highlight-pulse');
        }, 300);
    }
}
