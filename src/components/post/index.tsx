import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from 'react-redux'
import { IEntry } from '../../types/interfaces'
import { postEntry } from '../../redux/actions'
import { postEntry as apiPostEntry} from '../../api/entries'

export interface EntryParameters {
    postEntry: (entry: IEntry) => void
}

class Post extends Component<EntryParameters> {
    readonly state: IEntry

    constructor(props: EntryParameters) {
        super(props)
        this.state = { content: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({content: event.target.value})
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let [err, result] = await apiPostEntry(this.state)
        if (err) {
            // do something with erorrs
        }
        if (result) {
            this.props.postEntry(result)
            this.setState({content: ''})
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Entry: 
                    <input type="text" name="entry" value={this.state.content} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        postEntry: (entry: IEntry) => {
            dispatch(postEntry(entry))
        }
    }
}

export default connect(null, mapDispatchToProps)(Post)