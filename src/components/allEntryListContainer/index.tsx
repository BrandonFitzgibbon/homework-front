import React, { Component } from "react";
import { connect } from 'react-redux'
import { State, IEntry } from '../../types/interfaces'
import EntryList from "../entryList";
import { getEntries } from '../../api/entries'
import { setAllEntries } from '../../redux/actions'

interface EntryListContainerProps {
    entries: IEntry[]
    setAllEntries: (entries: IEntry[]) => void
}

class AllEntryListContainer extends Component<EntryListContainerProps> {
    async componentDidMount() {
        const [err, result] = await getEntries()
        if (result) {
            this.props.setAllEntries(result)
        } else {
            if (err) {
                console.log(err)
            }
        }
    }

    render() {
        return (
            <div>
                <h3>All Posts</h3>
                <EntryList entries={this.props.entries}></EntryList>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAllEntries: (entries: IEntry[]) => {
            dispatch(setAllEntries(entries))
        },
    }
}

const mapStateToProps = (state : State) => {
    return {
        entries: state.allEntries,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEntryListContainer)