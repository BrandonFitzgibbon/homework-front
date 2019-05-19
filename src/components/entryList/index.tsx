import React, { Component } from "react";
import { connect } from 'react-redux'
import { State, IEntry } from '../../types/interfaces'
import Entry from "../entry";

interface EntryListParameters {
    entries: IEntry[]
}

class EntryList extends Component<EntryListParameters> {
    render() {
        return (
            <ul>
                {this.props.entries.map((entry: IEntry) => {
                    return <Entry key={entry.content} content={entry.content}></Entry>
                })}
            </ul>
        )
    }
}


const mapStateToProps = (state : State) => {
    return {
        entries: state.entries
    }
}

export default connect(mapStateToProps)(EntryList)