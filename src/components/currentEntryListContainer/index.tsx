import React, { Component } from "react";
import { connect } from 'react-redux'
import { State, IEntry } from '../../types/interfaces'
import { getEntries } from '../../api/entries'
import { setCurrentEntries } from '../../redux/actions'
import EntryList from "../entryList";
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    header: {
        fontFamily: 'roboto',
        textAlign: 'left',
        marginLeft: '10px'
    }
});

interface EntryListContainerProps {
    entries: IEntry[]
    currentName: string
    setCurrentEntries: (entries: IEntry[]) => void
    classes: any
}

class CurrentEntryListContainer extends Component<EntryListContainerProps> {
    async componentDidMount() {
        if (this.props.currentName.length > 0) {
            const [err, result] = await getEntries(this.props.currentName)
            if (result) {
                this.props.setCurrentEntries(result)
            } else {
                if (err) {
                    console.log(err)
                }
            }
        }
    }

    async componentDidUpdate(prevProps: EntryListContainerProps) {
        if (prevProps.currentName !== this.props.currentName && this.props.currentName.length > 0) {
            const [err, result] = await getEntries(this.props.currentName)
            if (result) {
                this.props.setCurrentEntries(result)
            } else {
                if (err) {
                    console.log(err)
                }
            }
        }
    }

    render() {
        return (
            <div>
                <p className={this.props.classes.header}>Your previous posts</p>
                <EntryList entries={this.props.entries}></EntryList>
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setCurrentEntries: (entries: IEntry[]) => {
            dispatch(setCurrentEntries(entries))
        }
    }
}

const mapStateToProps = (state : State) => {
    return {
        entries: state.currentEntries,
        currentName: state.currentName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CurrentEntryListContainer))