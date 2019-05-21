export interface IEntry {
    _id?: string
    content: string
    name: string
}

export interface State {
    allEntries: IEntry[]
    currentEntries: IEntry[]
    currentName: string
}