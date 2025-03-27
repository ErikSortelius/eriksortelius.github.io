import { CardData } from './cardData.js';

export class ShopManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.currentSpecialTile = null;
        this.rerollCount = 0;
        this.isOpeningPack = false;
        this.packs = {
            cards: [
                {
                    id: 'card_basic',
                    title: 'Basic Card Pack',
                    cards: 2,  // Contains 2 cards
                    cost: 7,  // Costs 10 coins
                    description: 'Contains 2 random Cards, pick 1 card to add'
                },
                {
                    id: 'card_jumbo',
                    title: 'Jumbo Card Pack',
                    cards: 3,
                    cost: 9,
                    description: 'Contains 3 random Cards, pick 1 card to add'
                },
                {
                    id: 'card_ultra',
                    title: 'Ultra Card Pack',
                    cards: 5,
                    cost: 13,
                    description: 'Contains 5 random Cards, pick 1 card to add',
                }
            ],
            tiles: [
                {
                    id: 'tile_basic',
                    title: 'Basic Tile Pack',
                    tiles: 3,
                    cost: 4,
                    specialChance: 0.2,
                    description: 'Contains 3 random Tile, pick 1 tile to add to your bag'
                },
                {
                    id: 'tile_jumbo',
                    title: 'Jumbo Tile Pack',
                    tiles: 5,
                    cost: 5,
                    specialChance: 0.3,
                    guaranteed: 1,
                    description: 'Contains 5 random Tile, pick 1 tile to add to your bag'
                },
                {
                    id: 'tile_ultra',
                    title: 'Ultra Tile Pack',
                    tiles: 7,
                    specialChance: 0.3,
                    cost: 10,
                    description: 'Contains 7 random Tile, pick 1 tile to add to your bag'
                }
            ]
        };
        this.currentPacks = []; // Add this property to track available packs
        this.CARD_SELL_PRICE = 2; // Coins received for selling a card
        this.initialize();
    }

    initialize() {
        this.generateNewSpecialTile();
        this.generateNewPacks(); // Changed from renderPacks()
        this.setupEventListeners();
        this.updateShopUI();
    }

    updateShopUI() {
        // Update shop coins display
        const shopCoins = document.getElementById('shop-coins');
        if (shopCoins) {
            shopCoins.textContent = this.gameManager.stats.coins || 0;
        }

        const purchaseBtn = document.getElementById('purchase-tile');
        const rerollBtn = document.getElementById('reroll-tile');
        const currentCoins = this.gameManager.stats.coins || 0;

        if (purchaseBtn) {
            purchaseBtn.disabled = currentCoins < 5;
        }
        if (rerollBtn) {
            rerollBtn.disabled = currentCoins < (3 + this.rerollCount);
        }

        document.querySelectorAll('.pack-card').forEach(pack => {
            const packData = [...this.packs.cards, ...this.packs.tiles]
                .find(p => p.id === pack.dataset.id);
            if (packData) {
                pack.classList.toggle('disabled', currentCoins < packData.cost);
            }
        });

        document.querySelectorAll('.pack-button').forEach(pack => {
            const packData = [...this.packs.cards, ...this.packs.tiles]
                .find(p => p.id === pack.dataset.id);
            if (packData) {
                const atCardLimit = packData.cards && this.gameManager.cardManager.hasReachedCardLimit();
                pack.classList.toggle('disabled',
                    atCardLimit || this.gameManager.stats.coins < packData.cost);

                // Update hover text for card packs at limit
                const hoverInfo = pack.querySelector('.pack-hover-info');
                if (hoverInfo && packData.cards) {
                    hoverInfo.textContent = atCardLimit ? 'Card Limit (5/5)' : 'Buy';
                }
            }
        });
    }

    generateNewSpecialTile() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const letter = letters[Math.floor(Math.random() * letters.length)];
        const points = this.gameManager.tileBag.tileDistribution[letter].points;


        // Normal behavior
        const isSpecial = Math.random() < 0.2;
        let effectType = isSpecial ? this.gameManager.tileBag.getRandomEffectType() : null;
        if (isSpecial) {
            const availableEffects = Object.values(TileBag.EFFECT_TYPES);
            effectType = availableEffects[Math.floor(Math.random() * availableEffects.length)];
        }
        this.currentSpecialTile = {
            letter: letter,
            points: points,
            effectType: effectType,
            id: `shop-${Date.now()}`
        };


        this.renderSpecialTile();
    }

    renderSpecialTile() {
        const preview = document.querySelector('.tile-preview');
        if (!preview) return;

        if (!this.currentSpecialTile) {
            preview.innerHTML = `
                <div class="tile-placeholder">
                    <span>Reroll to see next tile</span>
                </div>
            `;
            return;
        }

        const specialClass = this.currentSpecialTile.effectType ?
            `special-${this.currentSpecialTile.effectType.toLowerCase().replace('_', '-')}` : '';

        preview.innerHTML = `
            <div class="tile shop-tile ${specialClass}">
                <span class="letter">${this.currentSpecialTile.letter}</span>
                <span class="points">${this.currentSpecialTile.points}</span>
                <div class="shine-effect"></div>
            </div>
        `;

        // Add tooltip for special tiles
        const tileElement = preview.querySelector('.tile');
        if (this.currentSpecialTile.effectType) {
            tileElement.addEventListener('mouseenter', () => {
                const [header, desc] = this.gameManager.getTileDescription(this.currentSpecialTile.effectType);
                this.gameManager.showTooltip([header, desc]);
            });

            tileElement.addEventListener('mouseleave', () => {
                this.gameManager.hideTooltip();
            });
        }
    }

    generateNewPacks() {
        // Clear existing packs
        this.currentPacks = [];

        const numPacks = Math.floor(Math.random() * 3) + 1;

        const allPacks = [...this.packs.cards, ...this.packs.tiles];
        const shuffled = [...allPacks].sort(() => Math.random() - 0.5);
        this.currentPacks = shuffled.slice(0, numPacks);

        // Render the new packs
        this.renderPacks();
    }

    renderPacks() {
        const packRack = document.querySelector('.pack-rack');
        if (!packRack) return;

        packRack.innerHTML = this.currentPacks.map(pack => `
            <div class="pack-button" data-id="${pack.id}">
                <div class="pack-button-content">
                    <div class="pack-title">${pack.title}</div>
                    <div class="pack-price">
                        <span class="coin">🪙</span> ${pack.cost}
                    </div>
                </div>
                <div class="pack-hover-info">Buy</div>
            </div>
        `).join('');

        // Add hover effects to pack buttons using shared tooltip
        packRack.querySelectorAll('.pack-button').forEach(packButton => {
            const pack = this.currentPacks.find(p => p.id === packButton.dataset.id);
            if (pack) {
                packButton.addEventListener('mouseenter', () => {
                    const details = pack.cards ?
                        this.getCardPackDetails(pack) :
                        this.getTilePackDetails(pack);
                    this.gameManager.showTooltip([pack.title, details]);
                });

                packButton.addEventListener('mouseleave', () => {
                    this.gameManager.hideTooltip();
                });
            }
        });
    }

    getCardPackDetails(pack) {
        const details = [];
        details.push(`Contains ${pack.cards} cards, pick 1`);

        return details.join('\n');
    }

    getTilePackDetails(pack) {
        const details = [];
        details.push(`Contains ${pack.tiles} tiles, pick 1`);

        return details.join('\n');
    }

    setupEventListeners() {
        // Reroll button
        const rerollBtn = document.getElementById('reroll-tile');
        if (rerollBtn) {
            rerollBtn.addEventListener('click', () => {
                const cost = 3 + this.rerollCount;
                if (this.gameManager.stats.coins >= cost) {
                    // Track spending for MERCANTILE before reroll
                    this.gameManager.cardManager.trackShopSpending(cost);
                    this.gameManager.updateCoins(-cost);
                    this.rerollCount++;
                    this.generateNewSpecialTile();
                    rerollBtn.textContent = `Reroll (${3 + this.rerollCount} 🪙)`;
                    updateAfterTransaction();
                }
            });
        }

        // Purchase tile button
        const purchaseBtn = document.getElementById('purchase-tile');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                if (this.gameManager.stats.coins >= 5 && this.currentSpecialTile) {
                    // Track spending for MERCANTILE before purchase
                    this.gameManager.cardManager.trackShopSpending(5);
                    this.gameManager.updateCoins(-5);
                    const purchasedTile = {
                        letter: this.currentSpecialTile.letter,
                        points: this.currentSpecialTile.points,
                        effectType: this.currentSpecialTile.effectType // Fix: use effectType directly
                    };

                    this.gameManager.tileBag.addTile(purchasedTile);

                    // Clear current tile and refresh display
                    this.currentSpecialTile = null;
                    this.renderSpecialTile();
                    this.updateShopUI();
                }
            });
        }

        // Pack purchase handlers
        document.querySelector('.pack-rack')?.addEventListener('click', (e) => {
            const packButton = e.target.closest('.pack-button');
            if (packButton) {
                const packId = packButton.dataset.id;
                const pack = this.currentPacks.find(p => p.id === packId);

                if (pack && this.gameManager.stats.coins >= pack.cost) {
                    this.purchasePack(pack);
                }
            }
        });

        // Add coins sync on shop popup open
        const shopPopup = document.getElementById('shopPopup');
        if (shopPopup) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (shopPopup.classList.contains('active')) {
                            // Reset card selection when shop opens
                            this.gameManager.cardManager.selectCardForSale(null);
                            this.updateSellUI();

                            // Rest of existing shop open logic
                            this.rerollCount = 0;
                            if (!this.currentSpecialTile) {
                                this.generateNewSpecialTile();
                            }
                            const rerollBtn = document.getElementById('reroll-tile');
                            if (rerollBtn) {
                                rerollBtn.textContent = `Reroll (3 🪙)`;
                            }
                            this.generateNewPacks();
                            this.updateShopUI();
                        }
                    }
                });
            });
            observer.observe(shopPopup, { attributes: true });
        }

        // Update UI after transactions
        const updateAfterTransaction = () => {
            this.updateShopUI();
            this.gameManager.updateStatsDisplay();
        };

        // Add sell button handler
        const sellButton = document.getElementById('sell-card');
        if (sellButton) {
            sellButton.addEventListener('click', () => this.sellSelectedCard());
        }
    }

    async purchasePack(pack) {
        if (this.isOpeningPack) return;

        if (this.gameManager.stats.coins >= pack.cost) {
            this.currentPacks = this.currentPacks.filter(p => p.id !== pack.id);
            this.isOpeningPack = true;

            // Track spending for MERCANTILE before spending coins
            this.gameManager.cardManager.trackShopSpending(pack.cost);
            this.gameManager.updateCoins(-pack.cost);

            // Create cinematic overlay
            const overlay = document.createElement('div');
            overlay.className = 'pack-opening-overlay';

            const packElement = document.createElement('div');
            packElement.className = 'opening-pack';
            packElement.innerHTML = `
                <div class="pack-art ${pack.id}">
                    <div class="pack-glow"></div>
                    <div class="pack-shine"></div>
                    <div class="pack-name">${pack.title}</div>
                </div>
                <button class="skip-button">Skip</button>
            `;

            overlay.appendChild(packElement);
            document.body.appendChild(overlay);

            // Handle skip - Changed from const to let
            let skipButton = overlay.querySelector('.skip-button');
            const handleSkip = () => {
                overlay.classList.add('fade-out');
                setTimeout(() => {
                    overlay.remove();
                    this.isOpeningPack = false;
                    this.renderPacks();
                }, 300);
            };
            skipButton.addEventListener('click', handleSkip);

            // Generate contents early to prepare animations
            const contents = pack.cards ?
                this.generateCardContents(pack) :
                this.generateTileContents(pack);

            // Pack hover effect
            //await new Promise(resolve => setTimeout(resolve, 500));
            //packElement.classList.add('hover');

            // Pack opening animation
            //await new Promise(resolve => setTimeout(resolve, 500));
            //packElement.classList.add('opening');

            // Show contents with staggered animation
            //await new Promise(resolve => setTimeout(resolve, 500));
            this.contents = contents; // Store contents for selection

            packElement.innerHTML = `
                <div class="pack-tooltip"></div>
                <div class="pack-contents">
                    ${contents.map((item) => {
                // Always include background style, falling back to default.png
                const backgroundStyle = item.type === 'card' ?
                    `style="--card-bg: url('/assets/${item.background || 'default.png'}')"` : '';

                return `
                            <div class="pack-item" 
                                 data-type="${item.type}"
                                 data-type="${item.cardType}"
                                 style="animation-delay: 0.2s">
                                ${item.type === 'card' ?
                        `<div class="pack-card" ${backgroundStyle}>
                                    <div class="card-face">
                                        <div class="card-title">${item.title}</div>
                                    </div>
                                 </div>` :
                        `<div class="tile ${item.specialClass || ''}">
                                    <span class="letter">${item.letter}</span>
                                    <span class="points">${item.points}</span>
                                 </div>`
                    }
                            </div>
                        `;
            }).join('')}
                </div>
                <button class="skip-button">Skip</button>
            `;

            // Add event listeners to pack items
            const packItems = packElement.querySelectorAll('.pack-item');
            packItems.forEach(item => {
                item.addEventListener('click', () => this.selectPackItem(item));
                item.addEventListener('mouseenter', () => this.gameManager.showPackTooltip(item));
                item.addEventListener('mouseleave', () => this.gameManager.hidePackTooltip());
            });

            // Apply holographic effects to ALL cards
            packElement.querySelectorAll('.pack-card').forEach(card => {
                HolographicCard.apply(card);
            });

            // Update skip button to new continue button
            skipButton = overlay.querySelector('.skip-button');
            skipButton.addEventListener('click', handleSkip);
        }
    }

    selectPackItem(element) {
        if (this.selectedItem) return;

        const container = element.parentElement;
        const items = container.querySelectorAll('.pack-item');
        const selectedContent = this.contents[Array.from(items).indexOf(element)];

        // Check card limit before proceeding with card selection
        if (selectedContent.type === 'card' && this.gameManager.cardManager.hasReachedCardLimit()) {
            this.gameManager.showError('Card limit reached (5/5)');
            return;
        }

        // Disable pointer events on container instead of individual items
        container.style.pointerEvents = 'none';

        // Group the animations in a single frame
        requestAnimationFrame(() => {
            items.forEach(item => {
                if (item !== element) {
                    item.classList.add('fade-down');
                }
            });
            element.classList.add('fade-up');
        });

        // Wait for selected item animation to complete
        element.addEventListener('animationend', () => {
            if (selectedContent.type === 'card') {
                // Get the full card data from CardData.CARDS
                const cardData = Object.values(CardData.CARDS)
                    .find(c => c.title === selectedContent.title);

                if (cardData) {
                    this.gameManager.addCard(cardData.id);  // Pass the card ID instead of partial data
                }
            } else {
                this.gameManager.tileBag.addTile(selectedContent);
            }

            const overlay = element.closest('.pack-opening-overlay');
            overlay.classList.add('fade-out');

            setTimeout(() => {
                overlay.remove();
                this.isOpeningPack = false;
                this.selectedItem = false;
                this.renderPacks();
            }, 300);
        }, { once: true });
    }

    generateCardContents(pack) {
        const contents = [];
        const usedCards = new Set();

        // Get available cards, excluding ones player already owns
        const availableCards = Object.values(CardData.CARDS)
            .filter(card => !this.gameManager.cardManager.playerCards
                .some(playerCard => playerCard.id === card.id));

        // Fill pack with random unique cards
        while (contents.length < pack.cards && availableCards.length > contents.length) {
            // Get random available card that hasn't been used in this pack
            const unusedCards = availableCards.filter(card => !usedCards.has(card.id));
            if (unusedCards.length === 0) break;

            const card = unusedCards[Math.floor(Math.random() * unusedCards.length)];
            usedCards.add(card.id);

            // Add card to contents with required properties
            contents.push({
                type: 'card',
                id: `${card.id}-${Date.now()}-${contents.length}`,
                title: card.title,
                background: card.background || 'default.png',
                cardType: card.type // Changed from cardType to type to match new structure
            });
        }

        return contents;
    }

    generateTileContents(pack) {
        const contents = [];
        const availableLetters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

        for (let i = 0; i < pack.tiles && availableLetters.length > 0; i++) {
            // Get random available letter
            const randomIndex = Math.floor(Math.random() * availableLetters.length);
            const letter = availableLetters[randomIndex];

            // Remove used letter from available pool
            availableLetters.splice(randomIndex, 1);

            const points = this.gameManager.tileBag.tileDistribution[letter].points;
            const isSpecial = pack.allSpecial ||
                (pack.guaranteed && i === 0) ||
                Math.random() < (pack.specialChance || 0);

            let effectType = isSpecial ? this.gameManager.tileBag.getRandomEffectType() : null;
            if (isSpecial) {
                const availableEffects = Object.values(TileBag.EFFECT_TYPES)
                effectType = availableEffects[Math.floor(Math.random() * availableEffects.length)];
            }
            const specialClass = effectType ?
                `special-${effectType.toLowerCase().replace('_', '-')}` : '';

            contents.push({
                type: 'tile',
                letter: letter,
                points: points,
                specialClass,
                effectType
            });
        }

        return contents;
    }

    handleCardSaleSelect(cardId) {
        // Only handle selection when shop is open
        const shopPopup = document.getElementById('shopPopup');
        if (!shopPopup?.classList.contains('active')) return;

        const wasSelected = this.gameManager.cardManager.selectedCardForSale === cardId;
        this.gameManager.cardManager.selectCardForSale(wasSelected ? null : cardId);

        this.updateSellUI();
        this.gameManager.renderPlayerCards();
    }

    updateSellUI() {
        const sellButton = document.getElementById('sell-card');
        const label = document.querySelector('.sell-card-label');

        if (!sellButton || !label) return;

        const selectedCard = this.gameManager.cardManager.playerCards.find(
            c => c.id === this.gameManager.cardManager.selectedCardForSale
        );

        if (selectedCard) {
            label.textContent = selectedCard.title;
            sellButton.disabled = false;
            sellButton.classList.add('active');
        } else {
            label.textContent = 'Select a card to sell';
            sellButton.disabled = true;
            sellButton.classList.remove('active');
        }
    }

    sellSelectedCard() {
        const selectedCard = this.gameManager.cardManager.playerCards.find(
            c => c.id === this.gameManager.cardManager.selectedCardForSale
        );

        if (selectedCard) {
            // 1. Hide any active tooltips
            this.gameManager.hideTooltip();

            // 2. Process the sale
            if (this.gameManager.cardManager.sellSelectedCard()) {
                // 3. Grant coins
                this.gameManager.updateCoins(this.CARD_SELL_PRICE);

                // 4. Update UI elements
                this.updateSellUI();
                this.updateShopUI();

                // 5. Re-render card rack
                this.gameManager.renderPlayerCards();
            }
        }
    }
}
