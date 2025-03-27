/**
 * Gets a random enemy image path
 * @returns {string} Path to random enemy image
 */
function getRandomEnemyImage() {
    const enemyCount = 8;
    const randomNum = Math.floor(Math.random() * enemyCount) + 1;
    return `./enemy/enemy${randomNum}.jpg`;
}

/**
 * Gets a random boss image path
 * @param {number} count Number of boss images to return (1-5)
 * @returns {string[]} Array of boss image paths
 */
function getRandomBossImages(count = 1) {
    const bossCount = 5;
    count = Math.min(Math.max(count, 1), bossCount); // Clamp between 1 and 5
    
    const numbers = Array.from({length: bossCount}, (_, i) => i + 1);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, count).map(num => `./boss/boss${num}.jpg`);
}

export class Enemy {
    constructor(config) {
        this.name = config.name;
        this.maxHealth = config.health;
        this.currentHealth = config.health;
        // Use level to determine boss image, cycling through available bosses
        this.image = config.isBoss ? 
            `./boss/boss${((config.level - 1) % 5) + 1}.jpg` : 
            getRandomEnemyImage();
        this.level = config.level;
        this.isBoss = config.isBoss || false;
        this.updateDisplay();
        console.log('Enemy created with health:', this.currentHealth);
    }

    updateDisplay() {
        const enemyImage = document.getElementById('enemy-image');
        const enemyName = document.getElementById('enemy-name');
        const healthBar = document.getElementById('enemy-health-bar');
        const healthText = document.getElementById('enemy-health-text');

        if (enemyImage) {
            enemyImage.src = `/assets/${this.image}`;
            enemyImage.alt = this.name;
        }

        if (enemyName) {
            enemyName.textContent = this.name;
        }

        if (healthBar) {
            const healthPercent = (this.currentHealth / this.maxHealth) * 100;
            healthBar.style.width = healthPercent + "%";
            healthBar.setAttribute("aria-valuenow", healthPercent);
        }

        if (healthText) {
            healthText.textContent = `${this.currentHealth}/${this.maxHealth}`;
        }
    }

    takeDamage(amount) {
        const oldHealth = this.currentHealth;
        this.currentHealth = Math.max(0, this.currentHealth - amount);
        console.log(`Enemy took ${amount} damage. Health: ${oldHealth} -> ${this.currentHealth}`);
        this.updateDisplay();
        return {
            oldHealth: oldHealth,
            newHealth: this.currentHealth,
            isDead: this.currentHealth <= 0
        };
    }
}

export class EnemyManager {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.currentLevel = 1;
        this.currentRound = 1;
        this.currentEnemy = null;
    }

    createEnemy(level, round) {
        const isBoss = round === 3; // Every 3rd round is a boss

        const health = Math.floor(this.calculateLevelHealth(level, round));

        return new Enemy({
            name: isBoss ? `Boss ${level}` : `Enemy ${level}-${round}`,
            health: health,
            isBoss: isBoss,
            level: level
        });
    }

    startLevel(level) {
        this.currentLevel = level;
        this.currentRound = 1;
        this.startRound();
    }

    cleanupEnemyDisplay() {
        const enemyDisplay = document.querySelector('.enemy-display');
        if (enemyDisplay) {
            enemyDisplay.classList.remove('damaged', 'defeated');
        }
    }

    startRound() {
        // Create and setup new enemy (removed cleanup from here)
        this.currentEnemy = this.createEnemy(this.currentLevel, this.currentRound);
        this.gameManager.stats.targetScore = this.currentEnemy.maxHealth;
    }

    dealDamage(amount) {
        if (!this.currentEnemy) return;

        const result = this.currentEnemy.takeDamage(amount);

        // Add visual feedback for damage
        const enemyDisplay = document.querySelector('.enemy-display');
        if (enemyDisplay) {
            enemyDisplay.classList.add('damaged');
            setTimeout(() => enemyDisplay.classList.remove('damaged'), 500);

            if (result.isDead) {
                // First shake, then show defeat animation after delay
                enemyDisplay.classList.add('damaged');
                setTimeout(() => {
                    enemyDisplay.classList.remove('damaged');
                    enemyDisplay.classList.add('defeated');
                }, 600); // Wait for shake to finish before defeat animation
            }
        }

        return result;
    }

    advanceRound() {
        // Clean up previous enemy display state before advancing
        this.cleanupEnemyDisplay();

        this.currentRound++;
        if (this.currentRound > 3) {
            // Show level progress when completing a boss (round 3)
            this.currentRound = 1;
            this.currentLevel++;
            this.showLevelProgress();
        }
        this.startRound();
    }

    showLevelProgress() {
        const overlay = document.querySelector('.level-progress-overlay');
        const progressBar = overlay.querySelector('.progress-bar');
        const nodes = overlay.querySelectorAll('.node');
        const header = overlay.querySelector('.level-header');

        // Calculate which nodes should be active based on level
        nodes.forEach((node, index) => {
            // Remove any existing active state
            node.classList.remove('active');

            // Mark nodes from previous levels as active
            if (index < this.currentLevel - 1) {
                node.classList.add('active');
            }

            // Update node numbers to show correct level range
            const levelNum = index + (Math.floor((this.currentLevel - 1) / 5) * 5) + 1;
            node.textContent = levelNum;
        });

        // Show overlay
        overlay.classList.add('active');

        // Start at current progress
        const currentNodeIndex = (this.currentLevel - 1) % 5;
        progressBar.style.width = `${(currentNodeIndex / 4) * 100}%`;

        // Animate to next node
        setTimeout(() => {
            progressBar.style.width = `${((currentNodeIndex + 1) / 4) * 100}%`;
            nodes[currentNodeIndex].classList.add('active');
        }, 500);

        // Update header
        header.textContent = (this.currentLevel + 1) === 5 ? 'Final Level' : `Level ${this.currentLevel}`;

        // Hide overlay after animation
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 2000);
    }

    calculateLevelHealth(level, round) {
        const k = 0.75;
        // const baseAmounts = [200, 600, 2000, 5000, 10000];
        const baseAmounts = [100, 400, 800, 1400, 1600];

        // Calculate base health
        let baseHealth;
        if (level <= 5) {
            baseHealth = baseAmounts[level - 1];
        } else {
            const a = baseAmounts[4];  // 5 base amount, from there on it's a formula (endless)
            const b = 1.6;
            const c = level - 5;
            const d = 1 + 0.2 * (level - 5);

            baseHealth = Math.floor(a * Math.pow(b + Math.pow(k * c, d), c));
            // Round to nearest significant digit
            const magnitude = Math.floor(Math.log10(baseHealth) - 1);
            baseHealth = baseHealth - (baseHealth % Math.pow(10, magnitude));
        }

        // Apply linear multiplier to get the round amount (1 + 0.5 * (round-1))
        const roundMultiplier = 1 + (0.5 * (round - 1));

        return Math.floor(baseHealth * roundMultiplier);
    }
}
