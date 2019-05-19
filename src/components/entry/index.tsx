import React from 'react'
import { IEntry } from '../../types/interfaces'

const Entry : React.FC<IEntry> = (entry: IEntry) => {
    return (
        <div>{entry.content}</div>
    )
}

export default Entry