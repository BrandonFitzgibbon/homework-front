import React, { Component, ChangeEvent, FormEvent } from "react";

export interface EntryParameters {

}

export interface EntryState {
    content: string
}

export default class Entry extends Component {
    readonly state: EntryState

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
        console.log('yolo')
        event.preventDefault()
        let result
        try {
            result = await fetch("https://api.brandonfitzgibbon.com/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            })
        } catch (err) {
            console.log(err)
        }
        console.log(result && await result.json())
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