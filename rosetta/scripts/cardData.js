export class CardData {
    // Add card type constants
    static CARD_TYPES = {
        MULTIPLIER: 'CARD_MULTIPLIER',
        LAST_STAND: 'CARD_LAST_STAND',
        SIZE_MATTERS: 'CARD_SIZE_MATTERS',
        DOPPEL: 'CARD_DOPPEL',
        SLEEPER: 'CARD_SLEEPER',
        SPREE: 'CARD_SPREE',
        NUMPAD: 'CARD_NUMPAD',
        COMEBACK: 'CARD_COMEBACK',
        TRIPPLE_A: 'CARD_TRIPPLE_A',
        ABSTINENCE: 'CARD_ABSTINENCE',
        GOONER: 'CARD_GOONER',
        VAMPIRIC: 'CARD_VAMPIRIC',
        CLOVER: 'CARD_FOUR_CLOVER',
        BULL: 'CARD_BULL',
        BEAR: 'CARD_BEAR',
        ENTROPY: 'CARD_ENTROPY',
        SCAVENGER: 'CARD_SCAVENGER',
        PLUNDER: 'CARD_PLUNDER',
        AEGIS: 'CARD_AEGIS',
        MAKESHIFT_WEAPON: 'CARD_MAKESHIFT_WEAPON',
        PILGRIM: 'CARD_PILGRIM',
        MIRROR_IMAGE: 'CARD_MIRROR_IMAGE',
        FIERCE_WARRIOR: 'CARD_FIERCE_WARRIOR',
        WISE_WARRIOR: 'CARD_WISE_WARRIOR',
        PACKLEADER: 'CARD_PACKLEADER',
        THRONE_ROOM: 'CARD_THRONE_ROOM',
        MERCANTILE: 'CARD_MERCANTILE',
        HANDS_OFF: 'CARD_HANDS_OFF'
    }

    // Move existing CARDS definition here
    static CARDS = {
        MULTIPLIER: {
            id: 'card-multiplier',
            type: 'CARD_MULTIPLIER',
            title: 'Sigil',
            background: 'sigil.jpg',
            description: 'Doubles the score of played word'
        },
        LAST_STAND: {
            id: 'card-last-stand',
            type: 'CARD_LAST_STAND',
            title: 'Last Stand',
            background: 'last_stand.jpg',
            description: '× 3 multiplier on final attempt'
        },
        SIZE_MATTERS: {
            id: 'card-size-matters',
            type: 'CARD_SIZE_MATTERS',
            title: 'Colossus',
            background: 'size_matters.jpg',
            description: '+800 points for words with 5 or more letters'
        },
        DOPPEL: {
            id: 'card-doppel',
            type: 'CARD_DOPPEL',
            title: 'Double Trouble',
            background: 'doppel.jpg',
            description: 'Score +300 for words with duplicate letters'
        },
        SLEEPER: {
            id: 'card-sleeper',
            type: 'CARD_SLEEPER',
            title: 'Dormant Knight',
            background: 'sleeper_agent.jpg',
            description: '×1.8 points per word when Z is in rack but not played'
        },
        SPREE: {
            id: 'card-spree',
            type: 'CARD_SPREE',
            title: 'Growing Stalk',
            background: 'stalk.jpg',
            description: 'Gains +10 for each consecutive valid word, resets if invalid word is played'
        },
        NUMPAD: {
            id: 'card-numpad',
            type: 'CARD_NUMPAD',
            title: 'Headcount',
            background: 'numpad.jpg',
            description: 'Multiplier based on number words up to nine (ONE=1.1x to NINE=1.9x)'
        },
        COMEBACK: {
            id: 'card-comeback',
            type: 'CARD_COMEBACK',
            title: 'Reanimation',
            background: 'comeback.jpg',
            description: 'Gains ×2 when the same words is played in a row, resets if a different word is played'
        },
        TRIPPLE_A: {
            id: 'card-tripple-a',
            type: 'CARD_TRIPPLE_A',
            title: 'Absolution',
            background: 'absolution.jpg',
            description: '+800 points if played word includes the letter A at least 2 times'
        },
        ABSTINENCE: {
            id: 'card-abstinence',
            type: 'CARD_ABSTINENCE',
            title: 'Abstinence',
            background: 'abstinence.jpeg',
            description: '+50 points for each word X is not played, resets if X is played'
        },
        GOONER: {
            id: 'card-gooner',
            type: 'CARD_GOONER',
            title: 'Indulgence',
            background: 'gooner.jpg',
            description: '+150 for each round X is played at least once, resets at the end of the round if X is not played'
        },
        VAMPIRIC: {
            id: 'card-vampiric',
            type: 'CARD_VAMPIRIC',
            title: 'Vampiric Favor',
            background: 'vampyric.jpg',
            description: 'Absorb 10% of total played letters as coins at the end of the round'
        },
        CLOVER: {
            id: 'card-four-clover',
            type: 'CARD_FOUR_CLOVER',
            title: 'Lucky Clover',
            background: 'clover.jpg',
            description: '1 in 4 chance of 1-4× multiplier'
        },
        BULL: {
            id: 'card-bull',
            type: 'CARD_BULL',
            title: 'Raging Bull',
            background: 'bull.jpg',
            description: '×1.8 when coins are 5 or less'
        },
        BEAR: {
            id: 'card-bear',
            type: 'CARD_BEAR',
            title: 'Watching Bear',
            background: 'bear.jpg',
            description: '+300 points when coins are 40 or more'
        },
        ENTROPY: {
            id: 'card-entropy',
            type: 'CARD_ENTROPY',
            title: 'Entropy',
            background: 'entropy.jpg',
            description: 'Add ×2 base value of the lowest-value tile in rack to score'
        },
        SCAVENGER: {
            id: 'card-scavenger',
            type: 'CARD_SCAVENGER',
            title: 'Scavenger',
            background: 'scavenger1.jpg',
            description: '+1 coin per 2 tiles remaining at round end'
        },
        PLUNDER: {
            id: 'card-plunder',
            type: 'CARD_PLUNDER',
            title: 'Plunder',
            background: 'plunder.jpg',
            description: 'Removes 50% of coins on last hand, +50 per stolen coin'
        },
        AEGIS: {
            id: 'card-aegis',
            type: 'CARD_AEGIS',
            title: 'Aegis',
            background: 'aegis.jpg',
            description: '+20 per letter played, up to +2000, release with 1-letter word'
        },
        MAKESHIFT_WEAPON: {
            id: 'card-makeshift-weapon',
            type: 'CARD_MAKESHIFT_WEAPON',
            title: 'Makeshift Weapon',
            background: 'makeshift_weapon.jpg',
            description: 'If this is the only card held in hand: ×1.8 per letter in word'
        },
        PILGRIM: {
            id: 'card-pilgrim',
            type: 'CARD_PILGRIM',
            title: 'Pilgrim',
            background: 'pilgrim.jpg',
            description: 'Every new unique letter adds 10 points to the word'
        },
        MIRROR_IMAGE: {
            id: 'card-mirror-image',
            type: 'CARD_MIRROR_IMAGE',
            title: 'Mirror Image',
            background: 'extra_arm.jpg',
            description: '×2 Score if word is a palindrome'
        },
        FIERCE_WARRIOR: {
            id: 'card-fierce-warrior',
            type: 'CARD_FIERCE_WARRIOR',
            title: 'Fierce Warrior',
            background: 'warrior_fierce.jpg',
            description: '+100 points, +200 with both warrior cards are held in hand'
        },
        WISE_WARRIOR: {
            id: 'card-wise-warrior',
            type: 'CARD_WISE_WARRIOR',
            title: 'Wise Warrior',
            background: 'warrior_wise.jpg',
            description: '×1.2 Score, ×1.4 with both warrior cards held in hand'
        },
        PACKLEADER: {
            id: 'card-packleader',
            type: 'CARD_PACKLEADER',
            title: 'Packleader',
            background: 'packleader.jpg',
            description: 'First letter score is multiplied by number of letters in the first word of the round'
        },
        THRONE_ROOM: {
            id: 'card-throne-room',
            type: 'CARD_THRONE_ROOM',
            title: 'Throne Room',
            background: 'throne_room.jpg',
            description: 'Gain coins equal to cards held at the end of the round'
        },
        MERCANTILE: {
            id: 'card-mercantile',
            type: 'CARD_MERCANTILE',
            title: 'Mercantile',
            background: 'mercantile.jpg',
            description: '+1 for each coin spent in shop from the time this card is drawn'
        },
        HANDS_OFF: {
            id: 'card-hands-off',
            type: 'CARD_HANDS_OFF',
            title: 'Fist',
            background: 'hands_off.jpg',
            description: '×0.8 DEBUFF if word has 5 letters, ×1.2 for all other words'
        }
    }

    // Add helper method to get card by type
    static getCardByType(type) {
        return Object.values(this.CARDS).find(card => card.type === type);
    }
}