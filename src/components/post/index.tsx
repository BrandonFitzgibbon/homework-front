import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import { IEntry, State } from '../../types/interfaces'
import { postAllEntry, postCurrentEntry } from '../../redux/actions'
import { postEntry} from '../../api/entries'
import './post.css'
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    form: {
        display: 'flex',
        width: '500px',
        margin: '10px'
    },
    button: {
        margin: '9px',
        minWidth: '100px'
    },
    cityInput: {
        flexGrow: 1
    },
    bottomContainer: {
        display: 'flex'
    },
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: 'thin',
        padding: '10px'
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        textAlign: 'left',
        fontFamily: 'roboto'
    },
    busyText: {
        textAlign: 'center',
        fontFamily: 'roboto'
    }
});

interface PostParameters {
    postAllEntry: (entry: IEntry) => void
    postCurrentEntry: (entry: IEntry) => void
    currentName: string
    classes: any
}

class Post extends Component<PostParameters> {
    readonly state: {
        content: string
        city: string
        validContent: boolean
        validCity: boolean
        inFlight: boolean
    }

    constructor(props: PostParameters) {
        super(props)
        this.state = { 
            content: '', 
            city: '',
            validContent: this.isRequiredValid(''),
            validCity: this.isRequiredValid(''),
            inFlight: false 
        }

        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tryPostEntry = this.tryPostEntry.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    isRequiredValid = (value: string) => {
        return value.length > 0
    }

    handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({content: event.target.value, validContent: this.isRequiredValid(event.target.value)})
    }

    handleCityChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({city: event.target.value, validCity: this.isRequiredValid(event.target.value)})
    }

    async handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await this.tryPostEntry()
    }

    async handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()
        await this.tryPostEntry()
    }

    async tryPostEntry() {
        if (this.isRequiredValid(this.state.content) && this.isRequiredValid(this.state.city)) {
            this.setState({inFlight: true})
            let [err, result] = await postEntry({
                content: this.state.content,
                name: this.props.currentName,
                city: this.state.city
            })
            if (err) {
                console.log(err)
            }
            if (result) {
                this.props.postAllEntry(result)
                this.props.postCurrentEntry(result)
                this.setState({
                    content: '',
                    city: '',
                    validContent: this.isRequiredValid(''),
                    validCity: this.isRequiredValid(''),
                    inFlight: false
                })
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormControl className={this.props.classes.form}>
                    <p className={this.props.classes.text}>What's on your mind?</p>
                    <div className={this.props.classes.postContainer}>
                        {this.state.inFlight ? 
                            (
                                <div className={this.props.classes.busyText}>Posting...</div>
                            ) : (
                                <div className={this.props.classes.subContainer}>
                                    <TextField label="Content" multiline rowsMax="6" value={this.state.content} onChange={this.handleContentChange} margin="normal"/>
                                    <div className={this.props.classes.bottomContainer}>
                                        <Input className={this.props.classes.cityInput} placeholder="City" value={this.state.city} onChange={this.handleCityChange} />
                                        <Button className={this.props.classes.button} variant="contained" color="primary" disabled={!this.state.validContent || !this.state.validCity} onClick={this.handleClick}>
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
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
        postAllEntry: (entry: IEntry) => {
            dispatch(postAllEntry(entry))
        },
        postCurrentEntry: (entry: IEntry) => {
            dispatch(postCurrentEntry(entry))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post))