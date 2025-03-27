import { CardManager } from './card.js';
import { CardData } from './cardData.js';
import { ShopManager } from './shop.js';
import { EnemyManager } from './enemy.js';
import { WordManager } from './wordManager.js';
import { ScoreAnimator } from './scoreAnimator.js';  // Add this import

export class GameManager {
    constructor() {
        // Get DOM elements
        this.tileRack = document.querySelector('.tile-rack');
        this.gameBoard = document.querySelector('.game-board');
        this.submitButton = document.getElementById('submit-word');
        this.maxHandSize = 12;
        this.maxAttempts = 5;
        this.maxDiscards = 2;
        this.inVictoryState = false;

        // Initialize managers
        this.cardManager = new CardManager();
        this.wordManager = new WordManager();
        this.enemyManager = new EnemyManager(this);
        this.shopManager = null;
        this.scoreAnimator = new ScoreAnimator();  // Add this line

        // Create tileBag first
        this.tileBag = new TileBag();

        // Then initialize UI elements that depend on tileBag
        this.initializeListeners();
        this.initializeDisplayElements();
        this.initializeRemainingTilesButton();
        // this.initializeTooltip();

        // Initialize game state last
        this.resetGameState();
        this.initializeCardTooltip();
    }

    // Helper method to reset game state
    resetGameState() {
        // Store current cards before reset
        const currentCards = [...this.cardManager.playerCards];

        // Reset all streak-based counters
        this.cardManager.resetAllStreaks();

        this.score = 0;
        this.round = 1;
        this.currentAttempts = 0;
        this.selectedTiles = [];
        this.selectedTile = null;
        this.frozen = false;
        this.discardsLeft = this.maxDiscards;
        this.playerHand = [];
        this.inVictoryState = false;

        // Initialize stats with debug coins if enabled
        this.stats = {
            wordsMade: 0,
            bestWord: '',
            bestScore: 0,
            attemptsLeft: this.maxAttempts,
            discardsLeft: this.maxDiscards,
            coins: 5
        };

        this.cardManager.playerCards = [...this.cardManager.playerCards];

        // Clear UI - preserve card container
        this.gameBoard.classList.remove('frozen');
        this.tileRack.classList.remove('frozen');

        // Clear only non-card elements
        Array.from(this.gameBoard.children)
            .filter(el => !el.classList.contains('card-container'))
            .forEach(el => el.remove());

        this.tileRack.innerHTML = '';

        // Restore cards
        this.cardManager.playerCards = currentCards;
        this.cardManager.playerCards = currentCards;

        // Initialize new tile bag and deal tiles
        this.tileBag = new TileBag();

        this.dealInitialTiles();

        // Clear existing cards and add selected ones
        this.cardManager.playerCards = [];

        // Add selected debug cards
        const selectedCards = document.querySelectorAll('.debug-card-checkbox:checked');
        selectedCards.forEach(checkbox => {
            const cardId = checkbox.value;
            const card = Object.values(CardData.CARDS).find(c => c.id === cardId);
            if (card) {
                this.cardManager.addCard(cardId);
            }
        });

        // Initialize enemy system for level 1
        this.enemyManager.startLevel(1);

        // Update UI
        this.renderPlayerCards();  // Changed from showDebugCard()
        this.updateStatsDisplay();
        this.updateSubmitButton();
        this.updateDiscardButton();

        console.log('Game state initialized');
    }

    // Simplified initializeGame that uses resetGameState
    initializeGame() {
        this.resetGameState();
        console.log('New game initialized');
    }

    dealInitialTiles() {
        const tiles = this.tileBag.draw(this.maxHandSize);
        if (tiles) {
            this.playerHand = tiles;
            this.renderTiles();
        }
    }

    initializeListeners() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.deselectAllTiles();
        });
    }

    renderTiles() {
        // Don't render tiles during victory state
        if (this.inVictoryState) return;

        this.tileRack.innerHTML = '';

        // Add all regular tiles - no more debug tiles
        this.playerHand.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            const specialClass = tile.effectType ?
                `special-${tile.effectType.toLowerCase().replace('_', '-')}` : '';
            tileElement.className = `tile${specialClass ? ` ${specialClass}` : ''}`;
            tileElement.dataset.id = tile.id;
            tileElement.style.animationDelay = `${index * 0.05}s`;

            tileElement.innerHTML = `
                <span class="letter">${tile.letter}</span>
                <span class="points">${tile.points}</span>
            `;
            this.setupTileSelection(tileElement, tile);
            this.tileRack.appendChild(tileElement);
        });
    }

    setupTileSelection(tileElement, tile) {
        // Click handler
        tileElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleTileSelection(tile, tileElement);
        });

        // Add tooltip for special tiles
        if (tile.effectType) {
            tileElement.addEventListener('mouseenter', () => {
                this.showTooltip(this.getTileDescription(tile.effectType));
            });

            tileElement.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        }
    }

    toggleTileSelection(tile, element) {
        // Find the exact tile by ID instead of just comparing letters
        const index = this.selectedTiles.findIndex(t => t.id === tile.id);

        if (index === -1) {
            // Only add if not already selected
            this.selectedTiles.push(tile);
            element.classList.add('selected');
        } else {
            // Remove the exact tile
            this.selectedTiles.splice(index, 1);
            element.classList.remove('selected');
        }

        this.renderSelectedWord();
        this.updateSubmitButton();
        this.updateDiscardButton();
    }

    deselectAllTiles() {
        // Remove selected class from all tiles in rack
        document.querySelectorAll('.tile-rack .tile').forEach(tile => {
            tile.classList.remove('selected');
        });

        // Find and store the card container if it exists
        const cardContainer = this.gameBoard.querySelector('.card-container');

        // Animate and remove only tile elements from game board
        const gameBoardTiles = document.querySelectorAll('.game-board .tile');
        if (gameBoardTiles.length > 0) {
            gameBoardTiles.forEach(tile => {
                tile.style.animation = 'fadeOut 0.2s ease-out forwards';
            });

            // Clear the board after animation, preserving cards
            setTimeout(() => {
                gameBoardTiles.forEach(tile => tile.remove());
            }, 200);
        }

        // Clear selected tiles array
        this.selectedTiles = [];
        this.updateSubmitButton();
        this.updateDiscardButton();
    }

    renderSelectedWord() {
        const existingTiles = Array.from(this.gameBoard.querySelectorAll('.tile'));

        // Remove tiles that are no longer selected
        existingTiles.forEach((tileElement) => {
            const tileId = tileElement.dataset.id;
            if (!this.selectedTiles.some(t => t.id === tileId)) {
                tileElement.style.animation = 'fadeOut 0.2s ease-out forwards';
                setTimeout(() => tileElement.remove(), 200);
            }
        });

        if (this.selectedTiles.length === 0) {
            this.gameBoard.innerHTML = '';
            return;
        }

        // Add or update tiles
        this.selectedTiles.forEach((tile, index) => {
            let tileElement = existingTiles.find(el => el.dataset.id === tile.id);

            if (!tileElement) {
                tileElement = document.createElement('div');
                const specialClass = tile.effectType ?
                    `special-${tile.effectType.toLowerCase().replace('_', '-')}` : '';
                tileElement.className = `tile${specialClass ? ` ${specialClass}` : ''}`;
                tileElement.dataset.id = tile.id;

                // Add tooltip functionality for special tiles
                if (tile.effectType) {
                    tileElement.addEventListener('mouseenter', () => {
                        this.showTooltip(this.getTileDescription(tile.effectType));
                    });

                    tileElement.addEventListener('mouseleave', () => {
                        this.hideTooltip();
                    });
                }

                this.gameBoard.appendChild(tileElement);
            }

            tileElement.innerHTML = `
                <span class="letter">${tile.letter}</span>
                <span class="points">${tile.points}</span>
            `;
        });
    }

    showError(message) {
        const errorMsg = document.getElementById('error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.opacity = 1;
            setTimeout(() => errorMsg.style.opacity = 0, 2000);
        }
    }

    discardSelected() {
        if (this.discardsLeft <= 0 || this.frozen || this.selectedTiles.length === 0) {
            return;
        }

        const selectedIds = new Set(this.selectedTiles.map(t => t.id));

        // Remove selected tiles
        this.playerHand = this.playerHand.filter(tile => !selectedIds.has(tile.id));

        // Draw new tiles
        const neededTiles = this.maxHandSize - this.playerHand.length;
        if (neededTiles > 0) {
            const newTiles = this.tileBag.draw(neededTiles);
            if (newTiles) {
                this.playerHand.push(...newTiles);
            }
        }

        // Update discard count
        this.discardsLeft--;
        this.stats.discardsLeft = this.discardsLeft;
        this.updateStatsDisplay();
        this.updateBagCount(); // Add this line to update bag count after discarding

        // Reset selection and update display
        this.deselectAllTiles();
        this.renderTiles();
        this.updateDiscardButton();
    }

    updateDiscardButton() {
        const discardButton = document.getElementById('discard');
        if (discardButton) {
            discardButton.disabled = this.discardsLeft <= 0 || this.selectedTiles.length === 0 || this.frozen;
        }
    }

    async showGameOver() {
        if (this.enemyManager.currentEnemy && this.enemyManager.currentEnemy.currentHealth > 0) {
            const tiles = document.querySelectorAll('.tile-rack .tile');
            tiles.forEach(tile => {
                tile.style.animation = 'fadeOutTile 0.5s ease forwards';
            });

            await new Promise(resolve => setTimeout(resolve, 500));
            this.tileRack.innerHTML = '';

            // Clear non-card elements
            Array.from(this.gameBoard.children)
                .filter(el => !el.classList.contains('card-container'))
                .forEach(el => el.remove());

            const popup = document.getElementById('gameOverPopup');
            if (!popup) return;

            // Update game over stats
            const finalDamage = this.enemyManager.currentEnemy.maxHealth - this.enemyManager.currentEnemy.currentHealth;
            const remainingHealth = this.enemyManager.currentEnemy.currentHealth;
            //const highestDamage = this.enemyManager.highestDamage;

            const finalScore = document.getElementById('final-score');
            const missedTarget = document.getElementById('missed-target');
            const returnButton = document.getElementById('returnToMenu');

            if (finalScore) finalScore.textContent = finalDamage;
            if (missedTarget) missedTarget.textContent = remainingHealth;

            popup.classList.add('active');

            if (returnButton) {
                returnButton.onclick = () => {
                    popup.classList.remove('active');
                    document.getElementById('canvas').classList.remove('hidden');
                    const menuScreen = document.getElementById('menu-screen');
                    const gameScreen = document.getElementById('game-screen');
                    if (menuScreen) menuScreen.classList.add('active');
                    if (gameScreen) gameScreen.classList.remove('active');
                };
            }
        }
    }

    async showVictory() {
        this.inVictoryState = true;
        this.frozen = true;

        // Initialize ShopManager if not exists
        if (!this.shopManager) {
            this.shopManager = new ShopManager(this);
        }

        const tiles = document.querySelectorAll('.tile-rack .tile');
        tiles.forEach(tile => {
            tile.style.animation = 'fadeOutTile 0.5s ease forwards';
        });

        await new Promise(resolve => setTimeout(resolve, 500));
        this.tileRack.innerHTML = '';

        // Clear non-card elements
        Array.from(this.gameBoard.children)
            .filter(el => !el.classList.contains('card-container'))
            .forEach(el => el.remove());

        this.tileBag.resetRound();

        // Calculate rewards
        const baseReward = 5;
        const attemptsBonus = this.stats.attemptsLeft;
        const totalReward = baseReward + attemptsBonus;

        document.getElementById('attempts-bonus').textContent = attemptsBonus;
        document.getElementById('rewards-total-value').textContent = totalReward;

        // Update coins
        this.updateCoins(totalReward);

        // Show shop with rewards
        await new Promise(resolve => setTimeout(resolve, 1000));
        const shopPopup = document.getElementById('shopPopup');
        shopPopup.classList.add('active');
        this.shopManager.renderPacks(); // Refresh packs when shop opens

        // Update continue button handler
        const confirmButton = document.getElementById('confirmReward');
        confirmButton.onclick = () => {
            shopPopup.classList.remove('active');
            this.nextRound();
        };
    }

    selectRewardTile(tile, element) {
        // If clicking the same tile again, deselect it
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            this.selectedRewardTile = null;
            document.querySelectorAll('.reward-tile').forEach(t => {
                t.classList.remove('faded');
            });
            return;
        }

        const allTiles = document.querySelectorAll('.reward-tile');

        // Fade out unselected tiles immediately
        allTiles.forEach(t => {
            if (t !== element) {
                t.classList.add('faded');
            } else {
                t.classList.remove('faded');
            }
        });

        // Select the clicked tile
        element.classList.add('selected');
        this.selectedRewardTile = tile;
    }

    nextRound() {
        this.inVictoryState = false;
        this.frozen = false;
        this.gameBoard.classList.remove('frozen');
        this.tileRack.classList.remove('frozen');

        // Find and preserve card container
        const cardContainer = this.gameBoard.querySelector('.card-container');

        // Clear only non-card elements from game board
        Array.from(this.gameBoard.children)
            .filter(el => !el.classList.contains('card-container'))
            .forEach(el => el.remove());

        this.selectedTiles = [];
        this.round++;
        this.currentAttempts = 0;
        this.score = 0;
        this.stats.attemptsLeft = this.maxAttempts;
        this.cardManager.packleaderUsed = false

        this.tileBag.resetRound(); // Use new reset method
        this.playerHand = [];

        this.discardsLeft = this.maxDiscards;
        this.stats.discardsLeft = this.maxDiscards;

        this.updateStatsDisplay();
        this.updateSubmitButton();
        this.updateDiscardButton();
        this.dealInitialTiles();

        // Instead of manually increasing target score, advance enemy
        this.enemyManager.advanceRound();
    }

    initializeDisplayElements() {
        this.displayElements = {
            roundHeader: document.getElementById('round-header'),
            healthText: document.getElementById('enemy-health-text'),
            healthBar: document.getElementById('enemy-health-bar'),
        };
    }

    updateStatsDisplay() {
        const d = this.displayElements;
        if (!d) return;

        const enemy = this.enemyManager.currentEnemy;
        if (enemy) {
            const maxHealth = enemy.maxHealth;
            const currentHealth = enemy.currentHealth;
            const healthPercent = (currentHealth / maxHealth) * 100;

            if (d.healthText) {
                d.healthText.textContent = `${currentHealth}/${maxHealth}`;
            }
            if (d.healthBar) {
                d.healthBar.style.width = `${healthPercent}%`;
                d.healthBar.setAttribute('aria-valuenow', healthPercent);
            }
        }

        // Update button text directly
        document.querySelectorAll('#submit-word').forEach(el => {
            el.textContent = `Play (${this.stats.attemptsLeft})`;
        });
        document.querySelectorAll('#discard').forEach(el => {
            el.textContent = `Discard (${this.stats.discardsLeft})`;
        });
    }

    updateSubmitButton() {
        this.submitButton.disabled = this.selectedTiles.length === 0;
    }

    initializeRemainingTilesButton() {
        const button = document.createElement('button');
        button.id = 'show-remaining';
        button.innerHTML = `
            <span class="tile-count">${this.tileBag.getRemainingCount()}</span>
            <span>Bag</span>
        `;

        button.addEventListener('click', () => {
            const popup = document.getElementById('remainingTilesPopup');
            if (!popup) return;

            // Toggle popup
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
                return;
            }

            popup.innerHTML = this.generateTileBagContent();
            popup.classList.add('active');

            // Close handlers
            const closeBtn = popup.querySelector('.close-popup');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    popup.classList.remove('active');
                });
            }

            // Click outside to close
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                }
            });
        });

        // Change: Add to bag-button-container instead of tile-rack
        document.getElementById('bag-button-container').appendChild(button);
        this.updateBagCount();
    }

    updateBagCount() {
        const button = document.getElementById('show-remaining');
        if (button) {
            const count = this.tileBag.getRemainingCount(); // Now uses new count format
            const countSpan = button.querySelector('.tile-count');
            if (countSpan) {
                countSpan.textContent = count;
            }
        }
    }

    generateTileBagContent() {
        const { remaining, specialTiles } = this.tileBag.generateTileBagContent();

        return `
            <div class="popup-header">
                <h2>Remaining Tiles</h2>
            </div>
            <div class="tile-count-list">
                ${Array.from(remaining.entries())
                .map(([letter, count]) => `
                    <div class="tile-count-item ${count === 0 ? 'empty' : ''}">
                        <span class="tile-count-letter">${letter}</span>
                        <span class="tile-count-number">${count}</span>
                    </div>
                `).join('')}
            </div>
            <div class="special-tile-list">
                <div class="tiles-container">
                    ${specialTiles.length > 0 ? specialTiles.map(tile => {
                    const specialClass = tile.effectType ?
                        `special-${tile.effectType.toLowerCase().replace('_', '-')}` : '';
                    return `
                            <div class="tile-wrapper" 
                                onmouseenter="window.gameManager.showTooltip(window.gameManager.getTileDescription('${tile.effectType}'))"
                                onmouseleave="window.gameManager.hideTooltip()">
                                <div class="tile${specialClass ? ` ${specialClass}` : ''}">
                                    <span class="letter">${tile.letter}</span>
                                    <span class="points">${tile.points}</span>
                                </div>
                            </div>`;
                }).join('') : '<div class="no-special-tiles">No special tiles in bag</div>'}
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-button close-popup">Close</button>
            </div>
        `;
    }

    getRemainingTileCounts() {
        const remaining = new Map();
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            remaining.set(letter, 0);
        });

        // Update to use roundTiles
        this.tileBag.roundTiles.forEach(tile => {
            remaining.set(tile.letter, (remaining.get(tile.letter) || 0) + 1);
        });

        return remaining;
    }

    initializeTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tile-tooltip';
        const controls = document.querySelector('.controls');
        controls.parentNode.insertBefore(tooltip, controls);
        this.tooltip = tooltip;
    }

    getTileDescription(effect) {
        const descriptions = {
            'DOUBLE_LETTER': ['2× Letter Tile', 'When this tile is scored, its points are doubled'],
            'TRIPLE_LETTER': ['3× Letter Tile', 'When this tile is scored, its points are tripled'],
            'DOUBLE_WORD': ['2× Word Tile', 'When this tile is scored, the word score is doubled'],
            'TRIPLE_WORD': ['3× Word Tile', 'When this tile is scored, the word score is tripled'],
            'BONUS': ['Bonus Tile', 'This tile adds 100 points to the word when scored'],
        };
        return descriptions[effect] || ['', ''];
    }

    showTooltip(text) {
        if (!this.cardTooltip || !Array.isArray(text) || text.length !== 2) return;
        const [header, content] = text;

        this.cardTooltip.innerHTML = `
            <div class="header">${header}</div>
            <div class="content">${content}</div>
        `;
        this.cardTooltip.classList.add('active');
    }

    hideTooltip() {
        if (this.cardTooltip) {
            this.cardTooltip.classList.remove('active');
        }
    }

    addCard(card) {
        this.cardManager.addCard(card);
        this.renderPlayerCards();  // Changed from showDebugCard()
    }

    renderPlayerCards() {  // Changed from showDebugCard()
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        // Use CardManager's renderCards method with tooltip handlers
        this.cardManager.renderCards(
            cardContainer,
            (card) => this.showCardTooltip(card.title, card.description),
            () => this.hideCardTooltip()
        );

        // Remove any existing card container
        const cardRack = document.querySelector('.card-rack');
        const existingContainer = cardRack.querySelector('.card-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Only add if there are cards to show
        if (this.cardManager.playerCards.length > 0) {
            cardRack.appendChild(cardContainer);
        }
    }

    updateModifiedStats() {
        // Safely update display elements if they exist
        if (this.displayElements) {
            if (this.displayElements.attemptsLeft) {
                this.displayElements.attemptsLeft.textContent = this.attemptsLeft
            }
            if (this.displayElements.discardsLeft) {
                this.displayElements.discardsLeft.textContent = this.discardsLeft
            }
        }
    }

    updateCoins(amount) {
        if (!this.stats.coins) this.stats.coins = 0;
        this.stats.coins += amount;

        // Update shop coins display
        const shopCoins = document.getElementById('shop-coins');
        if (shopCoins) {
            shopCoins.textContent = this.stats.coins || 0;
        }
    }

    showPackTooltip(element) {
        const tooltip = document.querySelector('.pack-tooltip');
        if (!tooltip) return;

        const type = element.dataset.type;
        if (type === 'card') {
            const cardTitle = element.querySelector('.card-title').textContent;
            const card = Object.values(CardData.CARDS)
                .find(c => c.title === cardTitle);

            if (card) {
                tooltip.innerHTML = `
                    <div class="header">${card.title}</div>
                    <div class="content">${card.description}</div>
                `;
                tooltip.classList.add('active');
            }
        } else if (type === 'tile') {
            const tile = element.querySelector('.tile');
            const effectType = Array.from(tile.classList)
                .find(c => c.startsWith('special-'))
                ?.replace('special-', '')
                .toUpperCase()
                .replace('-', '_');

            if (effectType) {
                const [header, content] = this.getTileDescription(effectType);
                tooltip.innerHTML = `
                    <div class="header">${header}</div>
                    <div class="content">${content}</div>
                `;
                tooltip.classList.add('active');
            }
        }
    }

    hidePackTooltip() {
        const tooltip = document.querySelector('.pack-tooltip');
        if (tooltip) tooltip.classList.remove('active');
    }

    getTooltipDataFromElement(element) {
        const type = element.dataset.type;
        if (type === 'card') {
            const cardTitle = element.querySelector('.card-title').textContent;
            // Use regular CARDS instead of DEBUG_CARDS
            const card = Object.values(CardData.CARDS)
                .find(c => c.title === cardTitle);
            return { type: card.type };
        } else {
            const tile = element.querySelector('.tile');
            const effectType = Array.from(tile.classList)
                .find(c => c.startsWith('special-'))
                ?.replace('special-', '')
                .toUpperCase()
                .replace('-', '_');
            return { effectType };
        }
    }

    processWordDamage(finalScore) {
        // The score was already calculated with card effects in WordManager
        // Apply the damage
        const result = this.enemyManager.dealDamage(finalScore);

        // Check win/lose conditions
        if (result.isDead) {
            this.cardManager.handleRoundEnd(this);
            if (this.enemyManager.currentLevel === 5) {
                this.showGameWon();
            } else {
                this.showVictory();
            }
        } else if (this.currentAttempts >= this.maxAttempts) {
            this.showGameOver();
        }

        this.updateStatsDisplay();
    }

    async showGameWon() {
        this.inVictoryState = true;
        this.frozen = true;

        const tiles = document.querySelectorAll('.tile-rack .tile');
        tiles.forEach(tile => {
            tile.style.animation = 'fadeOutTile 0.5s ease forwards';
        });

        await new Promise(resolve => setTimeout(resolve, 500));
        this.tileRack.innerHTML = '';

        // Clear non-card elements
        Array.from(this.gameBoard.children)
            .filter(el => !el.classList.contains('card-container'))
            .forEach(el => el.remove());

        // Show game won popup
        const popup = document.getElementById('gameWonPopup');
        if (popup) {
            popup.classList.add('active');

            // Handle return to menu
            const returnButton = popup.querySelector('#returnToMenuWon');
            if (returnButton) {
                returnButton.onclick = () => {
                    popup.classList.remove('active');
                    document.getElementById('canvas').classList.remove('hidden');
                    const menuScreen = document.getElementById('menu-screen');
                    const gameScreen = document.getElementById('game-screen');
                    if (menuScreen) menuScreen.classList.add('active');
                    if (gameScreen) gameScreen.classList.remove('active');
                };
            }

            // Handle continue playing (endless mode)
            const continueButton = popup.querySelector('#continueEndless');
            if (continueButton) {
                continueButton.onclick = () => {
                    popup.classList.remove('active');
                    this.showVictory();
                };
            }
        }
    }

    initializeCardTooltip() {
        if (!document.querySelector('.card-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.className = 'card-tooltip';
            document.body.appendChild(tooltip);
            this.cardTooltip = tooltip;
        }
    }

    showCardTooltip(title, description) {
        if (!this.cardTooltip || !title || !description) return;

        this.cardTooltip.innerHTML = `
            <div class="header">${title}</div>
            <div class="content">${description}</div>
        `;
        this.cardTooltip.classList.add('active');
    }

    hideCardTooltip() {
        if (this.cardTooltip) {
            this.cardTooltip.classList.remove('active');
        }
    }
}

// Export for module usage
export const gameManager = new GameManager();
window.gameManager = gameManager;
