import { CardData } from './cardData.js';
import { CARD_BONUSES, WORD_LISTS } from './constants.js';

/**
 * Manages all card-related effects and scoring
 * Card Effects are categorized as:
 * 1. Score Multipliers: Direct multiplication of score (e.g., Multiplier, Last Stand)
 * 2. Fixed Bonuses: Static point additions (e.g., Size Matters, Doppel)
 * 3. Streak-Based: Effects that build up over consecutive plays (e.g., Spree, Comeback)
 * 4. Special Pattern: Rewards for specific letter patterns (e.g., Mirror Image, Triple A)
 * 5. Conditional Effects: Based on game state (e.g., Hands Off, Codex)
 */
export class CardManager {
    constructor() {
        this.MAX_CARDS = 5;  // Add constant for max cards
        // Tracks all card states
        this.playerCards = [];              // Active playerCards
        this.validWordStreak = 0;     // For Spree card
        this.comebackCount = 0;       // For Comeback card
        this.lastPlayedWord = null;   // For Comeback tracking
        this.abstinenceBonus = 0;     // For Abstinence card
        this.goonerStreak = 0;        // For Gooner card
        this.aegisCharge = 0;
        this.vampiricLetters = 0; // Track letters played for Vampiric
        this.playedLetters = new Set(); // For Pilgrim
        this.pilgrimBonus = 0; // For Pilgrim card
        this.packleaderUsed = false; // For Packleader card
        this.runningTotal = 0;
        this.effects = [];
        this.multipliers = [];
        this.log = [];
        this.mercanticSpending = 0;  // Track coins spent for MERCANTILE bonus
        this.mercanticStarted = false; // Track if MERCANTILE is active
        this.roundCoinRewards = new Map(); // Track coins from each card
        this.selectedCardForSale = null; // Track card selected for selling
    }

    hasReachedCardLimit() {
        return this.playerCards.length >= this.MAX_CARDS;
    }

    addCard(cardId) {
        // Don't add if at max capacity
        if (this.hasReachedCardLimit()) {
            window.gameManager.showError('Card limit reached (5/5)');
            return false;
        }

        const card = Object.values(CardData.CARDS).find(c => c.id === cardId);
        if (!card) return false;

        this.playerCards.push(card);
        return true;
    }

    trackShopSpending(amount) {
        if (!amount || amount <= 0) return;

        const hasMercantile = this.playerCards.some(c => c.type === CardData.CARD_TYPES.MERCANTILE);
        if (hasMercantile) {
            this.mercanticStarted = true;
            this.mercanticSpending += amount;
        } else {
            this.mercanticStarted = false;
            this.mercanticSpending = 0;
        }
    }

    calculateTileScore(tiles) {
        this.runningTotal = 0;
        this.effects = [];
        this.multipliers = [];
        this.log = [];

        this.log.push("Start TILE SCORING");

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            let letterScore = tile.points;

            // Apply letter multipliers first
            if (tile.effectType === 'DOUBLE_LETTER') {
                letterScore *= 2;
                this.log.push(`${tile.letter}(${tile.points}) → ${letterScore} (Double Letter)`);
            } else if (tile.effectType === 'TRIPLE_LETTER') {
                letterScore *= 3;
                this.log.push(`${tile.letter}(${tile.points}) → ${letterScore} (Triple Letter)`);
            } else if (tile.effectType === 'BONUS') {
                letterScore += 100;
                this.log.push(`${tile.letter}(${tile.points}) → ${letterScore} (Bonus)`);
            }

            // Add letter score to running total
            const beforeTotal = this.runningTotal;
            this.runningTotal += letterScore;

            // Apply word multipliers
            if (tile.effectType === 'DOUBLE_WORD') {
                this.runningTotal *= 2;
                this.log.push(`${tile.letter}: Added ${letterScore}, then Word ×2: ${beforeTotal + letterScore} → ${this.runningTotal}`);
            } else if (tile.effectType === 'TRIPLE_WORD') {
                this.runningTotal *= 3;
                this.log.push(`${tile.letter}: Added ${letterScore}, then Word ×3: ${beforeTotal + letterScore} → ${this.runningTotal}`);
            } else {
                this.log.push(`${tile.letter}: Added ${letterScore}, total: ${this.runningTotal}`);
            }
        }

        this.log.push("End TILE SCORING");
        return this.runningTotal;
    }

    applyEffect(effect) {
        const { type, value, source, description } = effect;
        const effectData = {
            type,
            value: value, // Round down any decimal values
            source: source,
            description
        };

        // Apply the actual score change
        switch (type) {
            case 'add':
                this.runningTotal = Math.floor(this.runningTotal + value);
                break;
            case 'multiply':
                this.runningTotal = Math.floor(this.runningTotal * value);
                break;
        }

        // Two types of logging:
        this.log.push(`${source}: ${description}`);  // Text log for debugging
        this.effects.push(effectData);               // Structured data for animation
    }

    getFinalScore() {
        const scoreSteps = [];
        let runningTotal = 0;

        // Base tile scores with special effects
        this.tiles.forEach(tile => {
            // First add base tile score
            runningTotal += tile.points;
            scoreSteps.push({
                type: 'tile',
                letter: tile.letter,
                points: tile.points,
                finalPoints: tile.points,
                effectType: null,
                description: '',
                total: runningTotal
            });

            // Then add special effects as separate steps
            if (tile.effectType) {
                const beforeEffect = runningTotal;
                let effectDescription = '';

                switch (tile.effectType) {
                    case 'DOUBLE_LETTER':
                        runningTotal = beforeEffect * 2;
                        effectDescription = '(Double Letter)';
                        break;
                    case 'TRIPLE_LETTER':
                        runningTotal = beforeEffect * 3;
                        effectDescription = '(Triple Letter)';
                        break;
                    case 'DOUBLE_WORD':
                        runningTotal *= 2;
                        effectDescription = '(Double Word)';
                        break;
                    case 'TRIPLE_WORD':
                        runningTotal *= 3;
                        effectDescription = '(Triple Letter)';
                        break;
                    case 'BONUS':
                        runningTotal += 100;
                        effectDescription = '(Bonus +100)';
                        break;
                }

                if (effectDescription) {
                    scoreSteps.push({
                        type: 'tile',
                        letter: tile.letter,
                        points: beforeEffect,
                        finalPoints: runningTotal - beforeEffect,
                        effectType: tile.effectType,
                        description: effectDescription,
                        total: runningTotal
                    });
                }
            }
        });

        // Card effects remain the same
        this.effects.forEach(effect => {
            if (effect.type === 'multiply') {
                runningTotal *= effect.value;
            } else {
                runningTotal += effect.value;
            }

            scoreSteps.push({
                type: 'card',
                cardName: effect.source,
                operation: effect.type,
                value: effect.value,
                total: runningTotal
            });
        });

        return {
            baseScore: this.runningTotal,
            finalScore: Math.max(0, Math.floor(runningTotal)),
            scoreSteps
        };
    }

    /**
     * Applies card effects in order:
     * 1. Base score calculation from tiles
     * 2. Immediate letter multipliers
     * 3. Word multipliers as encountered
     * 4. Card effects in sequence:
     *    - Direct multipliers
     *    - Fixed bonuses
     *    - Conditional effects
     *    - Streak-based effects
     *    - Pattern-based effects
     * @param {Array} tiles - Array of letter tiles
     * @param {number} baseScore - Initial score before card effects
     * @param {number} attemptsLeft - Remaining attempts this round
     * @param {Array} remainingTiles - Tiles still in player's hand
     * @param {number} targetScore - Target score for the round
     * @returns {Object} Score breakdown including history and logs
     */
    applyCardEffects(tiles, attemptsLeft, remainingTiles, targetScore) {
        this.tiles = tiles; // Store tiles for getFinalScore
        const word = tiles.map(t => t.letter).join('');

        this.calculateTileScore(tiles);

        if (this.playerCards.length === 0) return this.getFinalScore();

        this.playerCards.forEach(card => {
            switch (card.type) {
                // Score Multiplier Cards
                case CardData.CARD_TYPES.MULTIPLIER:
                    this.applyEffect({
                        type: 'multiply',
                        value: 2,
                        source: card.type, // Changed from 'Multiplier Card'
                        description: '×2'
                    });
                    break;

                case CardData.CARD_TYPES.LAST_STAND:
                    if (attemptsLeft === 1) {
                        this.applyEffect({
                            type: 'multiply',
                            value: CARD_BONUSES.LAST_STAND,
                            source: card.type, // Changed from 'Last Stand Card'
                            description: `×${CARD_BONUSES.LAST_STAND} (final attempt)`
                        });
                    }
                    break;

                // Fixed Bonuses
                case CardData.CARD_TYPES.SIZE_MATTERS:
                    if (tiles.length >= 5) {
                        this.applyEffect({
                            type: 'add',
                            value: CARD_BONUSES.SIZE_MATTERS_BONUS,
                            source: card.type, // Changed from 'Size Matters'
                            description: `+${CARD_BONUSES.SIZE_MATTERS_BONUS} (5+ letters)`
                        });
                    }
                    break;

                case CardData.CARD_TYPES.DOPPEL:
                    if (new Set(tiles.map(t => t.letter)).size < tiles.length) {
                        this.applyEffect({
                            type: 'add',
                            value: CARD_BONUSES.DOPPEL_BONUS,
                            source: card.type,
                            description: '+300 (duplicate letters)'
                        });
                    }
                    break;

                // Streak-Based Cards
                case CardData.CARD_TYPES.SPREE:
                    this.validWordStreak++;
                    this.applyEffect({
                        type: 'add',
                        value: this.validWordStreak * CARD_BONUSES.SPREE_INCREMENT,
                        source: card.type, // Changed from 'Spree'
                        description: `+${this.validWordStreak * CARD_BONUSES.SPREE_INCREMENT} (${this.validWordStreak} streak)`
                    });
                    break;

                case CardData.CARD_TYPES.COMEBACK:
                    if (word === this.lastPlayedWord) {
                        this.comebackCount++;
                        this.applyEffect({
                            type: 'multiply',
                            value: Math.pow(2, this.comebackCount - 1),
                            source: card.type,
                            description: `×${Math.pow(2, this.comebackCount - 1)} (${this.comebackCount} repeats)`
                        });
                    } else {
                        this.comebackCount = 1;
                    }
                    break;

                case CardData.CARD_TYPES.NUMPAD:
                    if (word in WORD_LISTS.NUMBER_WORDS) {
                        this.applyEffect({
                            type: 'multiply',
                            value: WORD_LISTS.NUMBER_WORDS[word],
                            source: card.type, // Changed from 'Numpad'
                            description: `×${WORD_LISTS.NUMBER_WORDS[word]} (number word)`
                        });
                    }
                    break;

                // Conditional Cards
                case CardData.CARD_TYPES.HANDS_OFF:
                    if (tiles.length === 5) {
                        this.applyEffect({
                            type: 'multiply',
                            value: 0.8,
                            source: card.type, // Changed from 'Hands Off'
                            description: '×0.8 (5-letter penalty)'
                        });
                    } else {
                        this.applyEffect({
                            type: 'multiply',
                            value: 1.2,
                            source: card.type, // Changed from 'Hands Off'
                            description: '×1.2 (non-5-letter bonus)'
                        });
                    }
                    break;

                // Special Letter Cards
                case CardData.CARD_TYPES.TRIPPLE_A:
                    const aCount = tiles.filter(t => t.letter === 'A').length;
                    if (aCount >= 2) {
                        this.applyEffect({
                            type: 'add',
                            value: CARD_BONUSES.TRIPPLE_A_BONUS,
                            source: card.type, // Changed from 'Triple A'
                            description: `+${CARD_BONUSES.TRIPPLE_A_BONUS} (2+ A's found)`
                        });
                    }
                    break;

                // Add missing BULL card
                case CardData.CARD_TYPES.BULL:
                    if (gameManager.stats.coins <= CARD_BONUSES.BULL_THRESHOLD) {
                        this.applyEffect({
                            type: 'multiply',
                            value: CARD_BONUSES.BULL_MULTIPLIER,
                            source: card.type,
                            description: `×${CARD_BONUSES.BULL_MULTIPLIER} (${gameManager.stats.coins})`
                        });
                    }
                    break;

                // Add missing BEAR card
                case CardData.CARD_TYPES.BEAR:
                    if (gameManager.stats.coins >= CARD_BONUSES.BEAR_THRESHOLD) {
                        this.applyEffect({
                            type: 'add',
                            value: CARD_BONUSES.BEAR_PER_COIN * gameManager.stats.coins,
                            source: card.type, // Changed from 'Bear'
                            description: `+${CARD_BONUSES.BEAR_PER_COIN * gameManager.stats.coins} (${gameManager.stats.coins} coins)`
                        });
                    }
                    break;

                // Fix WISE_WARRIOR combo detection
                case CardData.CARD_TYPES.WISE_WARRIOR:
                    const hasFierceWarrior = this.playerCards.some(c =>
                        c.type === CardData.CARD_TYPES.FIERCE_WARRIOR);
                    const wiseMultiplier = hasFierceWarrior ?
                        CARD_BONUSES.WISE_WARRIOR_COMBO :
                        CARD_BONUSES.WISE_WARRIOR_BASE;
                    this.applyEffect({
                        type: 'multiply',
                        value: wiseMultiplier,
                        source: card.type, // Changed from 'Wise Warrior'
                        description: `×${wiseMultiplier} ${hasFierceWarrior ? '(combo)' : ''}`
                    });
                    break;

                // Add missing MERCANTILE tracking
                case CardData.CARD_TYPES.MERCANTILE:
                    if (this.mercanticSpending > 0) {
                        this.applyEffect({
                            type: 'add',
                            value: this.mercanticSpending,
                            source: card.type, // Changed from 'Mercantile'
                            description: `+${this.mercanticSpending} (coins spent)`
                        });
                    }
                    break;

                // Streak-Based Cards
                case CardData.CARD_TYPES.ABSTINENCE:
                    if (!tiles.some(t => t.letter === 'X')) {
                        this.abstinenceBonus += CARD_BONUSES.ABSTINENCE_INCREMENT;
                        this.applyEffect({
                            type: 'add',
                            value: this.abstinenceBonus,
                            source: card.type, // Changed from 'Abstinence'
                            description: `+${this.abstinenceBonus} (X avoided)`
                        });
                    } else {
                        this.abstinenceBonus = 0;
                    }
                    break;

                case CardData.CARD_TYPES.GOONER:
                    if (tiles.some(t => t.letter === 'X')) {
                        this.goonerStreak++;
                        this.applyEffect({
                            type: 'add',
                            value: CARD_BONUSES.GOONER_STREAK_MULTIPLIER * this.goonerStreak,
                            source: card.type, // Changed from 'Gooner'
                            description: `+${CARD_BONUSES.GOONER_STREAK_MULTIPLIER * this.goonerStreak} (${this.goonerStreak} X streak)`
                        });
                    } else {
                        this.goonerStreak = 0;
                    }
                    break;

                // Random Effect Cards
                case CardData.CARD_TYPES.CLOVER:
                    if (Math.random() < 0.25) {
                        const multiplier = Math.floor(Math.random() * 4) + 1;
                        this.applyEffect({
                            type: 'multiply',
                            value: multiplier,
                            source: card.type, // Changed from 'Four-Leaf Clover'
                            description: `×${multiplier} (luck triggered)`
                        });
                    }
                    break;

                // Special Pattern Cards
                case CardData.CARD_TYPES.MIRROR_IMAGE:
                    if (word === word.split('').reverse().join('')) {
                        this.applyEffect({
                            type: 'multiply',
                            value: 2,
                            source: card.type, // Changed from 'Mirror Image'
                            description: '×2 (palindrome)'
                        });
                    }
                    break;

                case CardData.CARD_TYPES.FIERCE_WARRIOR:
                    const hasWiseWarrior = this.playerCards.some(c => c.type === CardData.CARD_TYPES.WISE_WARRIOR);
                    const fierceBonus = hasWiseWarrior ? CARD_BONUSES.FIERCE_WARRIOR_COMBO : CARD_BONUSES.FIERCE_WARRIOR_BASE;
                    this.applyEffect({
                        type: 'add',
                        value: fierceBonus,
                        source: card.type, // Changed from 'Fierce Warrior'
                        description: `+${fierceBonus} ${hasWiseWarrior ? '(combo)' : ''}`
                    });
                    break;

                case CardData.CARD_TYPES.MAKESHIFT_WEAPON:
                    if (this.playerCards.length === 1) {
                        this.applyEffect({
                            type: 'multiply',
                            value: Math.pow(CARD_BONUSES.MAKESHIFT_BONUS, tiles.length),
                            source: card.type, // Changed from 'Makeshift Weapon'
                            description: `×${Math.pow(CARD_BONUSES.MAKESHIFT_BONUS, tiles.length)} (only card bonus)`
                        });
                    }
                    break;

                case CardData.CARD_TYPES.PACKLEADER:
                    if (!this.packleaderUsed) {
                        this.applyEffect({
                            type: 'add',
                            value: tiles[0].points * tiles.length,
                            source: card.type, // Changed from 'Packleader'
                            description: `+${tiles[0].points * tiles.length} (first letter × length)`
                        });
                        this.packleaderUsed = true;
                    }
                    break;

                case CardData.CARD_TYPES.ENTROPY:
                    const lowestTile = this.findLowestValueTile(remainingTiles);
                    if (lowestTile) {
                        this.applyEffect({
                            type: 'add',
                            value: lowestTile.points * CARD_BONUSES.ENTROPY_VALUE_BONUS,
                            source: card.type, // Changed from 'Entropy'
                            description: `+${lowestTile.points * CARD_BONUSES.ENTROPY_VALUE_BONUS} (lowest tile ${lowestTile.letter})`
                        });
                    }
                    break;

                case CardData.CARD_TYPES.PILGRIM:
                    const newLetters = tiles.filter(t => !this.playedLetters.has(t.letter));
                    if (newLetters.length > 0) {
                        this.applyEffect({
                            type: 'add',
                            value: newLetters.length * CARD_BONUSES.PILGRIM_PER_LETTER,
                            source: card.type, // Changed from 'Pilgrim'
                            description: `+${newLetters.length * CARD_BONUSES.PILGRIM_PER_LETTER} (${newLetters.length} new letters)`
                        });
                        newLetters.forEach(t => this.playedLetters.add(t.letter));
                    }
                    break;

                case CardData.CARD_TYPES.AEGIS:
                    // First calculate and accumulate charge (no effect needed)
                    const chargePoints = tiles.length * CARD_BONUSES.AEGIS_PER_LETTER;
                    this.aegisCharge = Math.min(this.aegisCharge + chargePoints, CARD_BONUSES.AEGIS_MAX);

                    // Only apply effect when releasing charge with 1-letter word
                    if (tiles.length === 1 && this.aegisCharge > 0) {
                        this.applyEffect({
                            type: 'add',
                            value: this.aegisCharge,
                            source: card.type, // Changed from 'Aegis'
                            description: `+${this.aegisCharge} (released charge)`
                        });
                        this.aegisCharge = 0;
                    }
                    break;

                case CardData.CARD_TYPES.PLUNDER:
                    if (gameManager.stats.attemptsLeft === 1) {
                        const stolenCoins = Math.floor(gameManager.stats.coins * 0.5);
                        gameManager.updateCoins(-stolenCoins);
                        this.applyEffect({
                            type: 'add',
                            value: stolenCoins * 50,
                            source: card.type, // Changed from 'Plunder'
                            description: `+${stolenCoins * 50} (stole ${stolenCoins} coins)`
                        });
                    }
                    break;

                case CardData.CARD_TYPES.SLEEPER:
                    let multiplierCount = remainingTiles.filter(tile => tile.letter === 'Z').length; // Count 'Z' tiles
                    if (multiplierCount > 0) {
                        this.applyEffect({
                            type: 'multiply',
                            value: Math.pow(CARD_BONUSES.SLEEPER_BONUS, multiplierCount),
                            source: card.type,
                            description: `+${multiplierCount * CARD_BONUSES.SLEEPER_BONUS}`
                        });
                    }
                    break;
            }
        });

        this.lastPlayedWord = word
        return this.getFinalScore();
    }

    /**
     * Processes end-of-round card effects
     * Includes:
     * - Vampiric: Convert letters to coins
     * - Scavenger: Coins from remaining tiles
     * - Second Hand: Return tiles to bag
     * - Throne Room: Coins from active playerCards
     */
    handleRoundEnd(gameManager) {
        this.roundCoinRewards.clear(); // Clear previous rewards
        this.playerCards.forEach(card => {
            switch (card.type) {
                case CardData.CARD_TYPES.VAMPIRIC:
                    // Coins: +0.1 per letter played
                    if (this.vampiricLetters > 0) {
                        const coins = Math.floor(this.vampiricLetters * CARD_BONUSES.VAMPIRIC_PERCENT);
                        if (coins > 0) {
                            gameManager.updateCoins(coins);
                            this.addCoinReward('Vampiric', coins);
                        }
                    }
                    this.vampiricLetters = 0;
                    break;

                case CardData.CARD_TYPES.SCAVENGER:
                    // Coins: +1 per 2 tiles remaining
                    const remainingTiles = gameManager.playerHand.length;
                    const coins = Math.floor(remainingTiles / 2) * CARD_BONUSES.SCAVENGER_PER_TWO;
                    if (coins > 0) {
                        gameManager.updateCoins(coins);
                        this.addCoinReward('Scavenger', coins);
                        console.log(`Scavenger: +${coins} coins (${remainingTiles} tiles remaining)`);
                    }
                    break;

                case CardData.CARD_TYPES.THRONE_ROOM:
                    // Coins: +1 per active card
                    const cardCount = this.playerCards.length;
                    gameManager.updateCoins(cardCount);
                    this.addCoinReward('Throne Room', cardCount);
                    console.log(`Throne Room: +${cardCount} coins from ${cardCount} playerCards`);
                    break;

            }
        });

        // Add coin rewards to rewards panel
        const rewardsRow = document.getElementById('card-rewards');
        if (rewardsRow) {
            rewardsRow.innerHTML = Array.from(this.roundCoinRewards.entries())
                .map(([source, amount]) => `
                    <div class="reward-item">
                        <div class="coin">🪙</div>
                        <div class="reward-details">
                            <span class="reward-label">${source}</span>
                            <span class="reward-value">+${amount}</span>
                        </div>
                    </div>
                `).join('');

            // Calculate total including base rewards and card rewards
            const baseReward = 5; // Victory bonus
            const attemptsBonus = gameManager.stats.attemptsLeft;
            const cardRewardsTotal = Array.from(this.roundCoinRewards.values())
                .reduce((sum, amount) => sum + amount, 0);
            const totalReward = baseReward + attemptsBonus + cardRewardsTotal;

            // Update total display
            const totalValueElement = document.getElementById('rewards-total-value');
            if (totalValueElement) {
                totalValueElement.textContent = totalReward;
            }
        }
    }

    /**
     * Add coin reward to be displayed in victory screen
     */
    addCoinReward(source, amount) {
        const current = this.roundCoinRewards.get(source) || 0;
        this.roundCoinRewards.set(source, current + amount);
    }

    renderCards(container, onHover, onLeave) {
        if (!container || !this.playerCards.length) return;

        const cardContainer = document.createElement('div');
        cardContainer.style.display = 'flex';
        cardContainer.innerHTML = this.playerCards.map(card => {
            const backgroundStyle = `style="--card-bg: url('/assets/${card.background || 'default.png'}')"`;
            const selectedClass = card.id === this.selectedCardForSale ? 'selected-for-sale' : '';

            return `
                <div class="playing-card ${selectedClass}" 
                    data-card-id="${card.id}"
                    data-type="${card.type}"
                    ${backgroundStyle}
                    onclick="window.gameManager.shopManager?.handleCardSaleSelect('${card.id}')">
                    <div class="card-face">
                    </div>
                </div>
            `;
        }).join('');

        // Clear container before adding new cards
        container.innerHTML = '';
        container.appendChild(cardContainer);

        // Apply perspective and 3D transforms
        container.style.perspective = '1200px';
        container.style.transformStyle = 'preserve-3d';

        // Apply holographic effects and event listeners
        cardContainer.querySelectorAll('.playing-card').forEach(cardElement => {
            const cardId = cardElement.dataset.cardId;
            const card = this.playerCards.find(c => c.id === cardId);

            // Set default colors and 3D properties
            cardElement.style.setProperty('--color1', '#ffaa00');
            cardElement.style.setProperty('--color2', '#ff00aa');
            cardElement.style.transformStyle = 'preserve-3d';
            cardElement.style.transform = 'translateZ(0)';

            // Create and apply holographic effect
            HolographicCard.apply(cardElement);

            // Add hover handlers if card is found and handlers provided
            if (card && onHover && onLeave) {
                cardElement.addEventListener('mouseenter', () => onHover(card));
                cardElement.addEventListener('mouseleave', onLeave);
            }
        });
    }

    selectCardForSale(cardId) {
        this.selectedCardForSale = cardId;
    }

    resetCardState(cardId) {
        const card = this.playerCards.find(c => c.id === cardId);
        if (!card) return;

        switch (card.type) {
            case CardData.CARD_TYPES.SPREE:
                this.validWordStreak = 0;
                break;
            case CardData.CARD_TYPES.COMEBACK:
                this.comebackCount = 0;
                this.lastPlayedWord = null;
                break;
            case CardData.CARD_TYPES.ABSTINENCE:
                this.abstinenceBonus = 0;
                break;
            case CardData.CARD_TYPES.GOONER:
                this.goonerStreak = 0;
                break;
            case CardData.CARD_TYPES.AEGIS:
                this.aegisCharge = 0;
                break;
            case CardData.CARD_TYPES.MERCANTILE:
                this.mercanticSpending = 0;
                this.mercanticStarted = false;
                break;
            case CardData.CARD_TYPES.PILGRIM:
                this.pilgrimBonus = 0;
                break;

        }
    }

    sellSelectedCard() {
        if (!this.selectedCardForSale) return false;

        // First reset the card's state
        this.resetCardState(this.selectedCardForSale);

        // Remove card from collection
        this.playerCards = this.playerCards.filter(card =>
            card.id !== this.selectedCardForSale
        );

        // Clear selection
        this.selectedCardForSale = null;

        return true;
    }

    resetAllStreaks() {
        // Reset all streak-based counters
        this.validWordStreak = 0;
        this.comebackCount = 0;
        this.lastPlayedWord = null;
        this.abstinenceBonus = 0;
        this.goonerStreak = 0;
        this.vampiricLetters = 0;
        this.aegisCharge = 0;
        this.playedLetters.clear();
        this.packleaderUsed = false;
        this.mercanticSpending = 0;
        this.mercanticStarted = false;
        this.pilgrimBonus = 0;
    }

    findLowestValueTile() {
        // Ensure we have an array to work with
        let tiles = gameManager.playerHand;
        if (!tiles || !Array.isArray(tiles) || tiles.length === 0) return null;

        return tiles.reduce((lowest, current) => {
            // Skip special tiles for Entropy calculation
            if (current.effectType) return lowest;

            // Initialize lowest if null
            if (!lowest) return current;

            // Compare points
            return current.points < lowest.points ? current : lowest;
        }, null);
    }
}
