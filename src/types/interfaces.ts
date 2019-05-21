export interface IEntry {
    _id?: string
    content: string
    name: string
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