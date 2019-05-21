import { IEntry } from '../../types/interfaces'

export const postEntry = async (entry : IEntry) : Promise<[Error?, IEntry?]> => {
    return [undefined, entry]
}

export const getEntries = async (name?: string) : Promise<[Error?, IEntry[]?]> => {
    return [undefined, []]
}