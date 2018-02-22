import { combineReducers } from 'redux';
import { RECEIVE_RHYMES,
    REQUEST_RHYMES,
    ADD_TO_HISTORY,
} from './actions';

import util from './util'

function rhymeGenerate(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case REQUEST_RHYMES:
            return Object.assign({}, state, {
                isFetching: true,
                original: action.word
            })

        case RECEIVE_RHYMES:
            return Object.assign({}, state, {
                punned: action.punned,
                isFetching: false,
                lastUpdated: action.receivedAt,
                isSuccess: action.isSuccess
            })
        default:
            return state

    }
}

function history(state = {
    pastSearches:[]
}, action) {
    switch (action.type) {
        case ADD_TO_HISTORY:
            return {
                pastSearches: [{
                    id: util.ID(),
                    search: action.search,
                    pun: action.pun,
                    isSuccess: action.isSuccess
                }, ...state.pastSearches,].slice(0, 31)
            }
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    rhymeGenerate,
    history
})

export default rootReducer
