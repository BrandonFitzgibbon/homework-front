import React from 'react'
import { IEntry } from '../../types/interfaces'

const Entry : React.FC<{entry: IEntry}> = (props: {entry: IEntry}) => {
    return (
        <div>{props.entry.content}</div>
    )
}

export default Entry