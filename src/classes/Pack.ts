import Deck from './Deck'

export default class Pack {
    id: string
    name: string
    answers: Deck
    questions: Deck

    constructor(id: string, name: string, answers: Deck, questions: Deck) {
        this.id = id
        this.name = name
        this.answers = answers
        this.questions = questions
    }
}
