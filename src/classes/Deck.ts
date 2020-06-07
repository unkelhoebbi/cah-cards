export default class Deck {
    cards: Array<string>
    cardType: string

    constructor(cardType: string, cards: Array<string> = []) {
        this.cards = cards
        this.cardType = cardType
    }
}
