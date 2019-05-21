import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTarget } from '../../redux/actions'
import { IEntry, State } from '../../types/interfaces'
import Post from '../post'

interface EntryProps {
    entry: IEntry
    currentTarget: string
    raiseChangeTarget: (target_id: string) => void
}

class Entry extends Component<EntryProps> {
    constructor(props: EntryProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (this.props.entry._id) {
            this.props.raiseChangeTarget(this.props.entry._id)
        }
    }

    render() {
        return (
            <div>
                <div>{this.props.entry.content}</div>
                <button onClick={this.handleClick}>Reply</button>
                {this.props.entry._id === this.props.currentTarget && (
                    <Post />
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        raiseChangeTarget: (target_id: string) => {
            dispatch(changeTarget(target_id))
        },
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentTarget: state.currentTarget
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry)