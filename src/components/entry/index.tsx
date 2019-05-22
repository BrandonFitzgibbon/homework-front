import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTarget, setCurrentReplies } from '../../redux/actions'
import { IEntry, State, IReply } from '../../types/interfaces'
import Reply from '../reply'
import EntryReplyList from '../entryReplyList'
import { getReplies } from '../../api/replies';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    root: {
        paddingBottom: '0px'
    },
    container: {
        margin: '5px'
    },
    postCard: {
        "&:last-child": {
            paddingBottom: 0
        }
    },
    postAction: {
        justifyContent: 'flex-end'
    },
    locationText: {
        fontStyle: 'italic',
        fontWeight: 'lighter',
        fontSize: '0.75rem'
    },
    detailsContainer: {
        display: 'flex',
        marginTop: '15px',
        justifyContent: 'space-between'
    },
    replyForm: {
        margin: '5px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

interface EntryProps {
    entry: IEntry
    currentName: string
    currentTarget: string
    currentReplies: IReply[]
    raiseChangeTarget: (target_id: string) => void
    setCurrentReplies: (replies: IReply[]) => void
    classes: any
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
            <div className={this.props.classes.container}>
                <Card>
                    <CardContent className={this.props.classes.postCard}>
                        <Typography>
                            {this.props.entry.content}
                        </Typography>
                        <div className={this.props.classes.detailsContainer}>
                            <Typography className={this.props.classes.locationText}>
                                {this.props.entry.name}
                            </Typography>
                            <Typography className={this.props.classes.locationText}>
                                {this.props.entry.city} ({this.props.entry.lat}, {this.props.entry.long}) {this.props.entry.temperature}&deg;C
                            </Typography>
                        </div>
                        <CardActions disableActionSpacing className={this.props.classes.postAction}>
                            {this.props.currentName.length > 0 && (
                                <Button size="small" color="primary" onClick={this.handleClick}>View Replies</Button>
                            )}     
                        </CardActions>
                    </CardContent>
                </Card>
                {this.props.currentTarget === this.props.entry._id && (
                    <div>
                        <EntryReplyList replies={this.props.currentReplies}/>
                    </div>
                )}
                {this.props.entry._id === this.props.currentTarget && (
                    <div className={this.props.classes.replyForm}>
                        <Reply />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Entry))