import React, { Component } from "react";
import { connect } from 'react-redux'
import { State, IEntry } from '../../types/interfaces'
import EntryList from "../entryList";
import { getEntries } from '../../api/entries'
import { setAllEntries } from '../../redux/actions'
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
    setAllEntries: (entries: IEntry[]) => void
    classes: any
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
                <p className={this.props.classes.header}>What other's have posted</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AllEntryListContainer))