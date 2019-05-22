import React, { Component, ChangeEvent, FormEvent } from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux'
import { changeName } from '../../redux/actions'
import { State } from '../../types/interfaces'
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    form: {
        display: 'flex',
        width: '500px',
        margin: '10px'
    },
    button: {
        margin: '3px'
    },
    nameContainer: {
        display: 'flex'
    },
    text: {
        textAlign: 'left',
        fontFamily: 'roboto'
    }
});

interface NameParameters {
    currentName: string
    changeName: (name: string) => void
    classes: any
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
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validName(name: string) {
        return name.length > 0
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        this.props.changeName(this.state.name)
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()
        this.props.changeName(this.state.name)
    }

    handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value, validName: this.validName(event.target.value)})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl className={this.props.classes.form} >
                    <div className={this.props.classes.nameContainer}>
                        <Input placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                        <Button className={this.props.classes.button} variant="contained" color="primary" disabled={!this.state.validName} onClick={this.handleClick}>
                            Submit
                        </Button>
                    </div>
                    { this.state.showInstructions && (
                        <p className={this.props.classes.text}>Please enter your name to start posting or replying</p>
                    )}
                </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Name))
