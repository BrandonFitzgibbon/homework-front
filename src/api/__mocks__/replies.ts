import { IReply } from '../../types/interfaces'

export const postReply = async (reply : IReply) : Promise<[Error?, IReply?]> => {
    return [undefined, reply]
}

export const getReplies = async (target: string) : Promise<[Error?, IReply[]?]> => {
    return [undefined, []]
}