import * as rp from 'request-promise';
import util from './util.js';
export const REQUEST_RHYMES = 'REQUEST_RHYMES';
export const RECEIVE_RHYMES = 'RECEIVE_RHYMES';
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';


const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const badwords = ["the", "on", "of", "a", "in", "are", "was", "by", "who"];

const options = {
    method: 'GET',
    uri: 'https://api.datamuse.com',
    json: true
}

export function addToHistory(search, pun, isSuccess) {
    return {
        type: ADD_TO_HISTORY,
        search,
        pun,
        isSuccess
    }
}



function requestRhymes(word) {
    return {
        type: REQUEST_RHYMES,
        word
    }
}

function receivePun(status, punned) {

    return {
        type: RECEIVE_RHYMES,
        punned: punned,
        receivedAt: Date.now(),
        isSuccess: status
    }
}

export function getRhymes(original) {
    let tokens = original.split(" ");

    let nonBadWordsIndices = [];
    for (let i = 0; i < tokens.length; i++) {
        if (!badwords.includes(tokens[i].toLowerCase())) {
            nonBadWordsIndices.push(i)
        }
    }

    let replaceIndex = util.getRandomElement(nonBadWordsIndices);
    let wordToBePunned = tokens[replaceIndex];

    const isCapitalized = wordToBePunned[0] === wordToBePunned[0].toUpperCase();
    const isAllCaps = wordToBePunned.length > 1 && wordToBePunned === wordToBePunned.toUpperCase();
    const punctuation= wordToBePunned[wordToBePunned.length - 1];
    const isPunctuated = !letters.includes(punctuation);

    if (isPunctuated) {
        wordToBePunned = wordToBePunned.slice(0, wordToBePunned.length - 1)
    }

    let rhymeOptions = Object.assign({}, options);
    rhymeOptions.uri += '/words?rel_rhy=' + wordToBePunned;

    return async function(dispatch) {
        dispatch(requestRhymes(original));

        let rhymes = await rp(rhymeOptions);

        //handle no rhymes found
        if (rhymes.length < 1) {
            dispatch(receivePun(false))
            dispatch(addToHistory(original, "", false))

        } else {
            let rhyme = util.getRandomElement(rhymes).word;
            if (isCapitalized) {
                rhyme = rhyme.replace(/\b\w/g, l => l.toUpperCase())
            }
            if (isAllCaps) {
                rhyme = rhyme.toUpperCase();
            }
            if (isPunctuated) {
                rhyme = rhyme + punctuation;
            }

            let punnedPhrase = tokens.slice();
            punnedPhrase.splice(replaceIndex, 1, rhyme);
            let punned = punnedPhrase.join(" ")
            dispatch(receivePun(true, punned))
            dispatch(addToHistory(original, punned, true))
        }
    }
}
