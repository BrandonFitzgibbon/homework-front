import React, { Component } from "react";
import { connect } from 'react-redux'
import { State, IEntry } from '../../types/interfaces'
import EntryList from "../entryList";

interface EntryListContainerProps {
    entries: IEntry[]
    currentName: string
}

class CurrentEntryListContainer extends Component<EntryListContainerProps> {
    render() {
        const title = this.props.currentName ? this.props.currentName + "'s Posts" : ""
        return (
            <div>
                <h3>{title}</h3>
                <EntryList entries={this.props.entries}></EntryList>
            </div>
        )
    }
}


const mapStateToProps = (state : State) => {
    return {
        entries: state.currentEntries,
        currentName: state.currentName
    }
}

export default connect(mapStateToProps)(CurrentEntryListContainer)