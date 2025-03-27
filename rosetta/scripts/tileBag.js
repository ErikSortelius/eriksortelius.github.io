class TileBag {
    static EFFECT_TYPES = {
        DOUBLE_WORD: 'DOUBLE_WORD',
        TRIPLE_WORD: 'TRIPLE_WORD',
        DOUBLE_LETTER: 'DOUBLE_LETTER',
        TRIPLE_LETTER: 'TRIPLE_LETTER',
        BONUS: 'BONUS',
    };

    constructor() {
        this.tileDistribution = {
            'A': { count: 9, points: 10 },    // Was 1
            'B': { count: 2, points: 30 },    // Was 3
            'C': { count: 2, points: 30 },    // Was 3
            'D': { count: 4, points: 20 },    // Was 2
            'E': { count: 12, points: 10 },   // Was 1
            'F': { count: 2, points: 40 },    // Was 4
            'G': { count: 3, points: 20 },    // Was 2
            'H': { count: 2, points: 40 },    // Was 4
            'I': { count: 9, points: 10 },    // Was 1
            'J': { count: 1, points: 80 },    // Was 8
            'K': { count: 1, points: 50 },    // Was 5
            'L': { count: 4, points: 10 },    // Was 1
            'M': { count: 2, points: 30 },    // Was 3
            'N': { count: 6, points: 10 },    // Was 1
            'O': { count: 8, points: 10 },    // Was 1
            'P': { count: 2, points: 30 },    // Was 3
            'Q': { count: 1, points: 100 },   // Was 10
            'R': { count: 6, points: 10 },    // Was 1
            'S': { count: 4, points: 10 },    // Was 1
            'T': { count: 6, points: 10 },    // Was 1
            'U': { count: 4, points: 10 },    // Was 1
            'V': { count: 2, points: 40 },    // Was 4
            'W': { count: 2, points: 40 },    // Was 4
            'X': { count: 1, points: 80 },    // Was 8
            'Y': { count: 2, points: 40 },    // Was 4
            'Z': { count: 1, points: 100 }    // Was 10
        };
        this.allTiles = [];     // All tiles in the game
        this.roundTiles = [];   // Tiles available in current round
        this.initializeBag();
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

    createTile(letter, points, options = {}) {
        return {
            id: options.id || `tile-${letter}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            letter: letter,
            points: points,
            isSpecial: !!options.effectType,
            effectType: options.effectType,
            isFirstDraw: !!options.isFirstDraw
        };
    }

    initializeBag() {
        this.allTiles = [];

        // Create base tiles
        for (const [letter, data] of Object.entries(this.tileDistribution)) {
            for (let i = 0; i < data.count; i++) {
                this.allTiles.push(this.createTile(letter, data.points));
            }
        }

        this.resetRound();
    }

    resetRound() {
        // Start fresh round with copy of all tiles
        this.roundTiles = [...this.allTiles];
        this.shuffle();

        // Update UI
        if (window.gameManager) {
            window.gameManager.updateBagCount();
        }
    }

    shuffle() {
        for (let i = this.roundTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.roundTiles[i], this.roundTiles[j]] = [this.roundTiles[j], this.roundTiles[i]];
        }
    }

    draw(count) {
        if (count > this.roundTiles.length) return null;

        // First, handle priority tiles
        const priorityTiles = this.roundTiles.filter(t => t.isFirstDraw);
        const regularTiles = this.roundTiles.filter(t => !t.isFirstDraw);

        const regularCount = Math.max(0, count - priorityTiles.length);
        const drawnTiles = [
            ...priorityTiles,
            ...regularTiles.slice(0, regularCount)
        ];

        // Update remaining tiles
        this.roundTiles = regularTiles.slice(regularCount);

        // Clear priority flags
        drawnTiles.forEach(tile => {
            if (tile.isFirstDraw) delete tile.isFirstDraw;
        });

        // Update UI
        if (window.gameManager) {
            window.gameManager.updateBagCount();
        }

        return drawnTiles;
    }

    getRemainingCount() {
        return `${this.roundTiles.length}/${this.allTiles.length}`;
    }

    addTile(tileData) {
        const newTile = this.createTile(
            tileData.letter,
            tileData.points,
            {
                effectType: tileData.effectType,
                isFirstDraw: true
            }
        );

        // Add to both collections
        this.allTiles.push(newTile);

        if (window.gameManager) {
            window.gameManager.updateBagCount();
        }
    }

    // Helper methods for tile counts
    getTotalTileCount() {
        return this.allTiles.length;
    }

    getCurrentTileCount() {
        return this.roundTiles.length;
    }

    getSpecialTileCount() {
        return this.roundTiles.filter(t => t.isSpecial).length;
    }

    getTilesByEffect(effectType) {
        return this.roundTiles.filter(t => t.effectType === effectType);
    }

    generateRandomSpecialTile(letter) {
        const points = this.tileDistribution[letter].points;
        const effectType = this.getRandomEffectType();

        return this.createTile(letter, points, {
            effectType: effectType,
            points: points
        });
    }

    getRandomEffectType() {
        const effects = Object.values(TileBag.EFFECT_TYPES);
        return effects[Math.floor(Math.random() * effects.length)];
    }

    generateTileHTML(tile, isEmpty = false) {
        const specialClass = tile.effectType ?
            `special-${tile.effectType.toLowerCase().replace('_', '-')}` : '';
        return `
            <div class="tile${specialClass ? ` ${specialClass}` : ''}${isEmpty ? ' empty' : ''}">
                <span class="letter">${tile.letter}</span>
                <span class="points">${tile.points}</span>
            </div>
        `;
    }

    generateTileBagContent() {
        // Initialize letter counts
        const remaining = new Map();
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            remaining.set(letter, 0);
        });

        // Count regular tiles
        this.roundTiles.filter(t => !t.isSpecial).forEach(tile => {
            remaining.set(tile.letter, (remaining.get(tile.letter) || 0) + 1);
        });

        // Get special tiles
        const specialTiles = this.roundTiles.filter(t => t.isSpecial);

        return { remaining, specialTiles };
    }
}
