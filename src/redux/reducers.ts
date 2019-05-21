import { combineReducers } from 'redux'
import { IEntry } from '../types/interfaces'
import { Type } from './actions'

function allEntries(state: IEntry[] = [], action: { type: Type, entries: IEntry[] }) : IEntry[] {
    switch(action.type) {
        case Type.POST_ALL_ENTRY:
            return [
                ...state,
                ...action.entries
            ]
        case Type.SET_ALL_ENTRIES:
            return action.entries
        default:
            return state
    }
}

function currentEntries(state: IEntry[] = [], action: { type: Type, entries: IEntry[] }) : IEntry[] {
    switch(action.type) {
        case Type.POST_CURRENT_ENTRY:
            return [
                ...state,
                ...action.entries
            ]
        case Type.SET_CURRENT_ENTRIES:
            return action.entries
        default:
            return state
    }
}

function currentName(state: string = '', action: { type: Type, name: string}) : string {
    switch(action.type) {
        case Type.CHANGE_NAME:
            return action.name
        default:
            return state
    }
    
}

function currentTarget(state: string = '', action: { type: Type, target_id: string}) : string {
    switch(action.type) {
        case Type.CHANGE_TARGET:
            return action.target_id
        default:
            return state
    }
}

const app = combineReducers({
    allEntries,
    currentEntries,
    currentName,
    currentTarget
})

export default app

