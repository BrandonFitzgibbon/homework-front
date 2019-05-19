import { IEntry } from '../types/interfaces'

export enum Type {
    POST_ENTRY = "POST_ENTRY"
}

export function postEntry(entry: IEntry) {
    return { type: Type.POST_ENTRY, entry }
}