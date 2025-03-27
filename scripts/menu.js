import { CardData } from './cardData.js';
import { EnemyManager } from './enemy.js';

class MenuManager {
    constructor() {
        // Wait for GameManager to be available
        if (!window.gameManager) {
            setTimeout(() => this.constructor(), 100);
            return;
        }

        this.menuScreen = document.getElementById('menu-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.startButton = document.getElementById('start-game');
        this.initializeListeners();
    }

    initializeListeners() {
        this.startButton.addEventListener('click', () => this.startGame());

        // Add tutorial button handler
        const tutorialButton = document.getElementById('how-to-play');
        const tutorialPopup = document.getElementById('tutorialPopup');

        if (tutorialButton && tutorialPopup) {
            tutorialButton.addEventListener('click', () => {
                tutorialPopup.classList.add('active');
                this.populateTileExamples();
            });

            // Close button handler
            const closeBtn = tutorialPopup.querySelector('.close-popup');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    tutorialPopup.classList.remove('active');
                });
            }

            // Click outside to close
            tutorialPopup.addEventListener('click', (e) => {
                if (e.target === tutorialPopup) {
                    tutorialPopup.classList.remove('active');
                }
            });
        }
        
        // Debug menu functionality
        const debugButton = document.getElementById('debug-menu');
        const debugPopup = document.getElementById('debugPopup');

        if (debugButton && debugPopup) {
            debugButton.addEventListener('click', () => {
                debugPopup.classList.add('active');
                this.generateCardCheckboxes();
            });

            // Close button handler
            const closeBtn = debugPopup.querySelector('.close-popup');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    debugPopup.classList.remove('active');
                });
            }

            // Click outside to close
            debugPopup.addEventListener('click', (e) => {
                if (e.target === debugPopup) {
                    debugPopup.classList.remove('active');
                }
            });

            // Initialize debug settings
            const coinsCheckbox = document.getElementById('debug-coins');
            if (coinsCheckbox) {
                coinsCheckbox.checked = localStorage.getItem('debug-coins') === 'true';
                coinsCheckbox.addEventListener('change', (e) => {
                    localStorage.setItem('debug-coins', e.target.checked);
                });
            }
        }
    }

    populateTileExamples() {
        const container = document.querySelector('.tile-examples');
        if (!container) return;

        // Show one regular and one special tile example
        container.innerHTML = `
            <div class="tile">
                <span class="letter">A</span>
                <span class="points">10</span>
            </div>
            <div class="tile special-double-word">
                <span class="letter">E</span>
                <span class="points">10</span>
            </div>
        `;
    }

    generateCardCheckboxes() {
        const cardGrid = document.getElementById('debug-card-grid');
        if (!cardGrid) return;

        // Clear existing checkboxes
        cardGrid.innerHTML = '';

        // Create card checkboxes
        Object.values(CardData.CARDS).forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'debug-card-option';
            cardDiv.innerHTML = `
                <label class="card-checkbox">
                    <input type="checkbox" 
                        class="debug-card-checkbox" 
                        value="${card.id}"
                        onchange="window.menuManager.handleCardSelection(this)">
                    <span>${card.title}</span>
                </label>
            `;
            cardGrid.appendChild(cardDiv);
        });

        // Add select/deselect all buttons handlers
        document.getElementById('select-all-cards')?.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.debug-card-checkbox');
            const firstFive = Array.from(checkboxes).slice(0, 5);
            firstFive.forEach(cb => {
                cb.checked = true;
                this.handleCardSelection(cb); // Ensure limits are enforced
            });
        });

        document.getElementById('deselect-all-cards')?.addEventListener('click', () => {
            document.querySelectorAll('.debug-card-checkbox').forEach(cb => {
                cb.checked = false;
                this.handleCardSelection(cb);
            });
        });
    }

    handleCardSelection(checkbox) {
        const selectedCount = document.querySelectorAll('.debug-card-checkbox:checked').length;
        
        if (selectedCount > 5) {
            checkbox.checked = false;
            window.gameManager.showError('Maximum 5 cards allowed');
            return;
        }

        // Save selection state
        localStorage.setItem(`debug_card_${checkbox.value}`, checkbox.checked);
    }

    startGame() {
        // Hide menu first
        this.menuScreen.classList.remove('active');
        
        // Create temporary EnemyManager to show initial progression
        const enemyManager = new EnemyManager(window.gameManager);
        enemyManager.showLevelProgress();

        // Wait for animation to complete before showing game screen
        setTimeout(() => {
            this.gameScreen.classList.add('active');
            if (window.gameManager) {
                window.gameManager.initializeGame();
            }
        }, 2000); // Match the animation duration in showLevelProgress
    }

    returnToMenu() {
        this.gameScreen.classList.remove('active');
        this.menuScreen.classList.add('active');
    }
}

// Wait for DOM and GameManager before initializing MenuManager
document.addEventListener('DOMContentLoaded', () => {
    const checkGameManager = setInterval(() => {
        if (window.gameManager) {
            clearInterval(checkGameManager);
            window.menuManager = new MenuManager();
        }
    }, 100);
});
