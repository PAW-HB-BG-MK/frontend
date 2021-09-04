import { Button, Modal } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { backendAddr } from "../../constants/apiConstants";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const CardHistoryModal = ({ open, close, boardId, listId, cardId, data }) => {
    const history = useHistory();
    const classes = useStyles();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.get(backendAddr + `api/card/events?id=${boardId}&list_id=${listId}&card_id=${cardId}`, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
            }
        }).then(res => {
            setEvents(res.data.data);
        }).catch(err => {
            console.log(err);
            history.push('/login');
        });
    }, [data]);

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <div className={classes.root}>
                <Grid className={classes.container} container direction="column" justify="center" spacing={2}>
                    <Grid item align="center">
                        <Typography variant="h4">
                            Historia aktywności
                        </Typography>
                    </Grid>
                    <Grid className={classes.height} item xs>
                        <div className={classes.list}>
                            <Grid container direction="column" spacing={2}>
                                {events.map((event, i) => (
                                    <Grid key={event.id} item>
                                        <div className={classes.listItem}>
                                            <Grid container justify="space-between">
                                                <Grid item>
                                                    <Typography variant="body1">
                                                        {i + 1}. {event.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">
                                                        {new Date(event.timestamp * 1000).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '400px',
        height: '800px',
        padding: 25,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    container: {
        height: '100%'
    },
    height: {
        maxHeight: '90%'
    },
    list: {
        flex: 1,
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    listItem: {
        display: 'flex',
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 10
    }
}));

export default CardHistoryModal;
