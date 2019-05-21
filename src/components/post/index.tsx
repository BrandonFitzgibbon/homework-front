import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from 'react-redux'
import { IEntry, State } from '../../types/interfaces'
import { postAllEntry, postCurrentEntry } from '../../redux/actions'
import { postEntry} from '../../api/entries'
import './post.css'

interface PostParameters {
    postAllEntry: (entry: IEntry) => void
    postCurrentEntry: (entry: IEntry) => void
    currentName: string
}

class Post extends Component<PostParameters> {
    readonly state: {
        content: string
        validContent: boolean
    }

    constructor(props: PostParameters) {
        super(props)
        this.state = { 
            content: '', 
            validContent: this.isContentValid(''), 
        }

        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tryPostEntry = this.tryPostEntry.bind(this)
    }

    isContentValid = (value: string) => {
        return value.length > 0
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({content: event.target.value, validContent: this.isContentValid(event.target.value)})
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await this.tryPostEntry()
    }

    async tryPostEntry() {
        if (this.isContentValid(this.state.content)) {
            let [err, result] = await postEntry({
                content: this.state.content,
                name: this.props.currentName
            })
            if (err) {
                console.log(err)
            }
            if (result) {
                this.props.postAllEntry(result)
                this.props.postCurrentEntry(result)
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
                    <input type="submit" value="Post" disabled={!this.state.validContent}/>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentName: state.currentName
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        postAllEntry: (entry: IEntry) => {
            dispatch(postAllEntry(entry))
        },
        postCurrentEntry: (entry: IEntry) => {
            dispatch(postCurrentEntry(entry))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)