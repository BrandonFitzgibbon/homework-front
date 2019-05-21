import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from 'react-redux'
import { IEntry, State } from '../../types/interfaces'
import { changeName, postAllEntry, postCurrentEntry, setCurrentEntries } from '../../redux/actions'
import { postEntry, getEntries, postReply} from '../../api/entries'
import './post.css'

export interface EntryParameters {
    postAllEntry: (entry: IEntry) => void
    postCurrentEntry: (entry: IEntry) => void
    setCurrentEntries: (entries: IEntry[]) => void
    changeName: (name: string) => void
    currentName: string
    currentTarget: string
}

class Post extends Component<EntryParameters> {
    readonly state: {
        content: string
        name: string
        validName: boolean
        validContent: boolean
        showNameWarning: boolean
        showContentWarning: boolean
    }

    constructor(props: EntryParameters) {
        super(props)
        this.state = { 
            content: '', 
            name: this.props.currentName, 
            validName: this.isNameOrContentValid(this.props.currentName), 
            validContent: this.isNameOrContentValid(''), 
            showNameWarning: false, 
            showContentWarning: false 
        }

        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tryPostEntry = this.tryPostEntry.bind(this)
        this.tryPostReply = this.tryPostReply.bind(this)
        this.tryChangeName = this.tryChangeName.bind(this)
        this.validate = this.validate.bind(this)
    }

    isNameOrContentValid = (value: string) => {
        return value.length > 0
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({content: event.target.value, validContent: this.isNameOrContentValid(event.target.value)})
    }

    handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value, validName: this.isNameOrContentValid(event.target.value)})
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        this.validate()
        await this.tryChangeName()
        if (this.props.currentTarget) {
            await this.tryPostReply()
        } else {
            await this.tryPostEntry()
        }
    }

    validate() {
        this.setState({
            showContentWarning: !this.state.validContent,
            showNameWarning: !this.state.validName
        })
    }

    async tryPostEntry() {
        if (this.state.validContent && this.state.validName) {
            let [err, result] = await postEntry({
                content: this.state.content,
                name: this.state.name
            })
            if (err) {
                // do something with erorrs
            }
            if (result) {
                this.props.postAllEntry(result)
                this.props.postCurrentEntry(result)
                this.setState({
                    content: '',
                    validContent: false
                })
            }
        }
    }

    async tryPostReply() {
        if (this.state.validContent && this.state.validName) {
            let [err, result] = await postReply({
                target_id: this.props.currentTarget,
                content: this.state.content,
                name: this.state.name
            })
            if (err) {
                // do something with erorrs
            }
            if (result) {
                this.setState({
                    content: '',
                    validContent: false
                })
            }
        }
    }

    async tryChangeName () {
        if (this.state.validName && this.props.currentName !== this.state.name) {
            let [err, result] = await getEntries(this.state.name)
            if (err) {
                // do something with erorrs
            }
            if (result) {
                this.props.setCurrentEntries(result)
                this.props.changeName(this.state.name)
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="postContainer">
                    <label className="postLabel">
                        {this.props.currentTarget ? "New Reply" : "New Post"}
                    </label>
                    <textarea className="entryBox" value={this.state.content} onChange={this.handleContentChange}/>
                    { this.state.showContentWarning && (
                        <div>
                            Can't post empty content
                        </div>
                    ) }
                    <div>
                        <input placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                        <input type="submit" value="Submit" />
                    </div>
                    { this.state.showNameWarning && (
                        <div>
                            Name can't be empty
                        </div>
                    ) }
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
        postAllEntry: (entry: IEntry) => {
            dispatch(postAllEntry(entry))
        },
        postCurrentEntry: (entry: IEntry) => {
            dispatch(postCurrentEntry(entry))
        },
        setCurrentEntries: (entries: IEntry[]) => {
            dispatch(setCurrentEntries(entries))
        },
        changeName: (name: string) => {
            dispatch(changeName(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)