import React from "react";
import { IReply } from '../../types/interfaces'

const EntryReply : React.FC<{reply: IReply}> = (props: {reply: IReply}) => {
    return (
        <div>
            <div>{props.reply.content}</div>
        </div>
    )
}

export default EntryReply