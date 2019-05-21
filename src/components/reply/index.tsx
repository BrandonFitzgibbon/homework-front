import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from 'react-redux'
import { State, IReply } from '../../types/interfaces'
import { postCurrentReply, changeTarget } from '../../redux/actions'
import { postReply } from '../../api/replies'

interface ReplyParameters {
    postCurrentReply: (reply: IReply) => void
    changeTarget: (target: string) => void
    currentName: string
    currentTarget: string
}

class Reply extends Component<ReplyParameters> {
    readonly state: {
        content: string
        validContent: boolean
    }

    constructor(props: ReplyParameters) {
        super(props)
        this.state = { 
            content: '', 
            validContent: this.isContentValid(''), 
        }

        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tryPostReply = this.tryPostReply.bind(this)
    }

    isContentValid = (value: string) => {
        return value.length > 0
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({content: event.target.value, validContent: this.isContentValid(event.target.value)})
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await this.tryPostReply()
    }

    async tryPostReply() {
        if (this.isContentValid(this.state.content)) {
            let [err, result] = await postReply({
                content: this.state.content,
                name: this.props.currentName,
                target_id: this.props.currentTarget
            })
            if (err) {
                console.log(err)
            }
            if (result) {
                this.props.postCurrentReply(result)
                this.setState({
                    content: '',
                    validContent: this.isContentValid('')
                })
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="postContainer">
                    <textarea className="entryBox" placeholder="content" value={this.state.content} onChange={this.handleContentChange}/>
                    <input type="submit" value="Reply" disabled={!this.state.validContent}/>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentName: state.currentName,
        currentTarget: state.currentTarget
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        postCurrentReply: (reply: IReply) => {
            dispatch(postCurrentReply(reply))
        },
        changeTarget: (target: string) => {
            dispatch(changeTarget(target))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reply)