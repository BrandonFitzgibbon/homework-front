import { combineReducers } from 'redux'
import { IEntry } from '../types/interfaces'
import { Type } from './actions'

function entries(state: IEntry[] = [], action: { type: Type, entry: IEntry }) : IEntry[] {
    switch(action.type) {
        case Type.POST_ENTRY:
            return [
                ...state,
                action.entry
            ]
        default:
            return state
    }
}

const app = combineReducers({
    entries: entries
})

export default app

