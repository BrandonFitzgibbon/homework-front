import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IReply } from '../../types/interfaces'
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

const EntryReply : React.FC<{reply: IReply, classes:any}> = (props: {reply: IReply, classes: any}) => {
    return (
        <div className={props.classes.container}>
            <Card>
                <CardContent className={props.classes.postCard}>
                    <Typography>
                        {props.reply.content}
                    </Typography>
                    <div className={props.classes.detailsContainer}>
                        <Typography className={props.classes.locationText}>
                            {props.reply.name}
                        </Typography>
                        <Typography className={props.classes.locationText}>
                            {props.reply.city} ({props.reply.lat}, {props.reply.long}) {props.reply.temperature}&deg;C
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default withStyles(styles)(EntryReply)