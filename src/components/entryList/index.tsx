import React from "react";
import { IEntry } from '../../types/interfaces'
import Entry from "../entry";

const EntryList : React.FC<{entries: IEntry[]}> = (props: {entries: IEntry[]}) => {
    return (
        <ul>
            {props.entries.map((entry: IEntry) => {
                return <Entry key={entry._id} entry={entry}/>
            })}
        </ul>
    )
}

export default EntryList