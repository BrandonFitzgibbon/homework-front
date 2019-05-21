import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { changeName } from '../../redux/actions'
import { State } from '../../types/interfaces'

interface NameParameters {
    currentName: string
    changeName: (name: string) => void
}

class Name extends Component<NameParameters> {
    readonly state: {
        name: string
        validName: boolean
        showInstructions: boolean
    }

    constructor(props: NameParameters) {
        super(props)
        
        this.state = {
            name: '',
            validName: this.validName(''),
            showInstructions: true
        }

        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validName(name: string) {
        return name.length > 0
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        this.props.changeName(this.state.name)
    }

    handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value, validName: this.validName(event.target.value)})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                <input disabled={!this.state.validName} type="submit" value="Submit" />
                { this.state.showInstructions && (
                    <p>Please enter your name to post or reply</p>
                )}
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
        changeName: (name: string) => {
            dispatch(changeName(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Name)
