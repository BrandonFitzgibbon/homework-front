export interface IEntry {
    _id?: string
    content: string
    name: string
    city: string
    lat?: number
    long?: number
    temperature?: number
}

export interface IReply extends IEntry {
    target_id: string
}

export interface State {
    allEntries: IEntry[]
    currentEntries: IEntry[]
    currentReplies: IReply[]
    currentName: string
    currentTarget: string
}