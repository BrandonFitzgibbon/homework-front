import { IEntry } from '../types/interfaces'

export enum Type {
    POST_ALL_ENTRY = "POST_ALL_ENTRY",
    POST_CURRENT_ENTRY = "POST_CURRENT_ENTRY",
    SET_ALL_ENTRIES = "SET_ALL_ENTRIES",
    SET_CURRENT_ENTRIES = "SET_CURRENT_ENTRIES",
    CHANGE_NAME = "CHANGE_NAME",
    CHANGE_TARGET = "CHANGE_TARGET"
}

export function postAllEntry(entry: IEntry) {
    return { type: Type.POST_ALL_ENTRY, entries: [entry] }
}

export function postCurrentEntry(entry: IEntry) {
    return { type: Type.POST_CURRENT_ENTRY, entries: [entry] }
}

export function setAllEntries(entries: IEntry[]) {
    return { type: Type.SET_ALL_ENTRIES, entries}
}

export function setCurrentEntries(entries: IEntry[]) {
    return { type: Type.SET_CURRENT_ENTRIES, entries}
}

export function changeName(name: string) {
    return { type: Type.CHANGE_NAME, name }
}

export function changeTarget(target_id: string) {
    return { type: Type.CHANGE_TARGET, target_id}
}