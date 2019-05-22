import { IReply } from '../types/interfaces'

const url = process.env.REACT_APP_API_ENDPOINT || "https://api.brandonfitzgibbon.com"

export const getReplies = async (target_id: string) : Promise<[Error?, IReply[]?]> => {
    let result
    try {
        result = await fetch(url + "/entries/" + target_id + "/replies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = result && await result.json()
    }
    catch(err) {
        return [err, undefined]
    }
    return [undefined, result]
}

export const postReply = async (reply : IReply) : Promise<[Error?, IReply?]> => {
    let result
    try {
        result = await fetch(url + "/entries/" + reply.target_id + "/replies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: reply.content,
                name: reply.name,
                city: reply.city
            })
        })
        result = result && await result.json()
    }
    catch(err) {
        return [err, undefined]
    }
    return [undefined, result]
}