import Pack from './classes/Pack'
import Deck from './classes/Deck'

const fetch = require('node-fetch')
const fs = require('fs')

let counter = 0
let mappedPacks: Pack[] = new Array()

function getPacks(): Promise<any> {
    return fetch('https://cards-against-humanity-api.herokuapp.com/sets').then(
        (response: any) => {
            return response.json()
        }
    )
}

function getSinglePack(id: string): Promise<any> {
    return fetch('https://cards-against-humanity-api.herokuapp.com/sets/'+id).then(
        (response: any) => {
            return response.json()
        }
    )
}

function mapPacks(): Promise<any> {
    return getPacks().then((data: any) => {
        let max = data.length
        data.forEach((pack: any) => {
            getSinglePack(pack.setName).then((data: any) => {
                let questions: string[] = new Array()
                let answers: string[] = new Array()

                data.blackCards.forEach((question: any) => {
                    questions.push(question.text)
                })

                data.whiteCards.forEach((answer: any) => {
                    answers.push(answer)
                })

                let packObj  = new Pack(pack.setName, pack.setName, new Deck('answer', answers), new Deck('question', questions))
                mappedPacks.push(packObj)
                counter++

                if (counter + 1 == max) {
                    writePacksFile(mappedPacks)
                }
            })
        })
    })
}

function prepareFile(): Promise<any> {
    let mappedPacks: Pack[] = new Array()

    return writePacksFile(mappedPacks)
}

function writePacksFile(mappedPacks: Pack[]): Promise<any> {
    return new Promise(function(resolve, reject) {
        fs.writeFile('../data/cards.json', JSON.stringify(mappedPacks), function(error: Error){
            if (error)
                reject(error);
            else
                resolve();
        })
    })
}

prepareFile().then(mapPacks)