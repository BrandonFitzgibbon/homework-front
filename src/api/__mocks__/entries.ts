import { IEntry } from '../../types/interfaces'

export const postEntry = async (entry : IEntry) : Promise<[Error?, IEntry?]> => {
    return [undefined, entry]
}