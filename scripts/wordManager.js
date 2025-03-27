export class WordManager {
    constructor() {
        this.words = new Set();
        this.STORAGE_KEY = 'rosetta_dictionary';
        this.WORD_LIST_URL = '/data/wordlist.txt';

        this.initializeWords();
    }

    async initializeWords() {
        const response = await fetch(this.WORD_LIST_URL);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let wordBuffer = '';
        let processedWords = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                this.processWordChunk(wordBuffer);
                break;
            }

            const chunk = decoder.decode(value, { stream: true });
            wordBuffer += chunk;

            const lines = wordBuffer.split('\n');
            wordBuffer = lines.pop() || '';

            processedWords += this.processWordChunk(lines.join('\n'));
            if (processedWords % 10000 === 0) {
            }
        }

    }

    processWordChunk(text) {
        const words = text.split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word);

        words.forEach(word => this.words.add(word));
        return words.length;
    }

    isValidWord(word) {
        word = word.toUpperCase().trim();
        word = word.replace(/\+/g, '');
        const isValid = this.words.has(word);
        console.log(`Word validation: "${word}" - ${isValid ? 'VALID' : 'INVALID'}`);
        return isValid;
    }

    // Word processing methods moved from WordProcessor
    async processWordSubmission(gameManager) {
        gameManager.frozen = true;
        const word = gameManager.selectedTiles.map(t => t.letter).join('');
        const isValid = await this.checkWord(word);

        if (!isValid) {
            // Show invalid word in red using score animator
            gameManager.scoreAnimator.showInvalidWord();
            await new Promise(resolve => setTimeout(resolve, 1000));
            gameManager.frozen = false;
            return;
        }

        // Get score data with detailed log
        const scoreData = gameManager.cardManager.applyCardEffects(
            gameManager.selectedTiles,
            gameManager.stats.attemptsLeft,
            gameManager.playerHand,
            gameManager.enemyManager.currentEnemy.maxHealth
        );

        // Pass the scoreSteps to animateScore
        await gameManager.scoreAnimator.animateScore(scoreData);

        // Process damage and update game state
        const playedTileIds = new Set(gameManager.selectedTiles.map(t => t.id));
        await this.updateGameState(gameManager, word, scoreData.finalScore, playedTileIds);

        // Deal damage and check win/lose conditions
        await gameManager.processWordDamage(scoreData.finalScore);

        // Draw new tiles and cleanup
        await this.drawNewTiles(gameManager);
        await this.cleanupAfterSubmission(gameManager, true);
    }

    async checkWord(word) {
        const isValid = this.isValidWord(word);
        return isValid;
    }

    highlightTiles(gameManager, isValid) {
        const gameBoardTiles = document.querySelectorAll('.game-board .tile');
        gameBoardTiles.forEach(tile => {
            requestAnimationFrame(() => {
                tile.classList.add(isValid ? 'highlight-success' : 'highlight-error');
            });
        });
    }

    animatePlayedTiles(playedTileIds) {
        const rackTiles = document.querySelectorAll('.tile-rack .tile');
        rackTiles.forEach(tile => {
            if (playedTileIds.has(tile.dataset.id)) {
                tile.style.animation = 'fadeOutTile 0.5s ease forwards';
            }
        });
    }

    async updateGameState(gameManager, word, score, playedTileIds) {
        // Track best word/score
        if (score > gameManager.stats.bestScore) {
            gameManager.stats.bestScore = score;
            gameManager.stats.bestWord = word;
        }

        // Remove played tiles
        gameManager.playerHand = gameManager.playerHand.filter(t => !playedTileIds.has(t.id));

        // Update attempts
        gameManager.currentAttempts++;
        gameManager.stats.attemptsLeft = gameManager.maxAttempts - gameManager.currentAttempts;
    }

    async drawNewTiles(gameManager) {
        const neededTiles = gameManager.maxHandSize - gameManager.playerHand.length;
        if (neededTiles > 0) {
            const newTiles = gameManager.tileBag.draw(neededTiles);
            if (newTiles) {
                gameManager.playerHand.push(...newTiles);
            }
        }

        // Update bag count after drawing
        gameManager.updateBagCount();
    }

    async cleanupAfterSubmission(gameManager, isValid) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTimeout(() => {
            try {
                gameManager.deselectAllTiles();
                gameManager.frozen = false;
                gameManager.gameBoard.classList.remove('frozen');
                gameManager.tileRack.classList.remove('frozen');

                if (isValid) {
                    gameManager.renderTiles();

                    if (gameManager.currentAttempts >= gameManager.maxAttempts) {
                        gameManager.showGameOver().catch(err => {
                            console.error('Error showing game over screen:', err);
                        });
                    }
                }
            } catch (error) {
                console.error('Error in cleanup:', error);
            }
        }, 300);
    }
}
