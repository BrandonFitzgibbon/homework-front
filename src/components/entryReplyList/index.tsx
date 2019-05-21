import React from "react";
import { IReply } from '../../types/interfaces'
import EntryReply from "../entryReply";

const EntryReplyList : React.FC<{replies: IReply[]}> = (props: {replies: IReply[]}) => {
    return (
        <ul>
            {props.replies.map((reply: IReply) => {
                return <EntryReply key={reply._id} reply={reply}/>
            })}
        </ul>
    )
}

export default EntryReplyList