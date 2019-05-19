import { IEntry } from '../types/interfaces'

const url = process.env.REACT_APP_API_ENDPOINT || "https://api.brandonfitzgibbon.com"

export const postEntry = async (entry : IEntry) : Promise<[Error?, IEntry?]> => {
    let result
    try {
        result = await fetch(url + "/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
        result = result && await result.json()
    }
    catch(err) {
        return [err, undefined]
    }
    return [undefined, result]
}