import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTarget, setCurrentReplies } from '../../redux/actions'
import { IEntry, State, IReply } from '../../types/interfaces'
import Reply from '../reply'
import EntryReplyList from '../entryReplyList'
import { getReplies } from '../../api/replies';

interface EntryProps {
    entry: IEntry
    currentName: string
    currentTarget: string
    currentReplies: IReply[]
    raiseChangeTarget: (target_id: string) => void
    setCurrentReplies: (replies: IReply[]) => void
}

class Entry extends Component<EntryProps> {
    constructor(props: EntryProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        if (this.props.currentTarget === this.props.entry._id) {
            const [err, result] = await getReplies(this.props.entry._id)
            if (result) {
                this.props.setCurrentReplies(result)
            } else {
                if (err) {
                    console.log(err)
                }
            }
        }
    }

    async componentDidUpdate(prevProps: EntryProps) {
        if (prevProps.currentTarget !== this.props.currentTarget && this.props.currentTarget === this.props.entry._id) {
            const [err, result] = await getReplies(this.props.entry._id)
            if (result) {
                this.props.setCurrentReplies(result)
            } else {
                if (err) {
                    console.log(err)
                }
            }
        }
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (this.props.entry._id) {
            if (this.props.entry._id !== this.props.currentTarget) {
                this.props.setCurrentReplies([])
                this.props.raiseChangeTarget(this.props.entry._id)
            }
        }
    }

    render() {
        return (
            <div>
                <div>{this.props.entry.content}</div>
                {this.props.currentName.length > 0 && (
                    <button onClick={this.handleClick}>View Replies</button>
                )}
                {this.props.currentTarget === this.props.entry._id && (
                    <EntryReplyList replies={this.props.currentReplies}/>
                )}
                {this.props.entry._id === this.props.currentTarget && (
                    <Reply />
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
        setCurrentReplies: (replies: IReply[]) => {
            dispatch(setCurrentReplies(replies))
        }
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentTarget: state.currentTarget,
        currentName: state.currentName,
        currentReplies: state.currentReplies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry)