import { Button, Modal } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { backendAddr } from "../../constants/apiConstants";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const DeleteCardModal = ({ open, close, boardId, listId, cardId, setLoading }) => {
    const history = useHistory();
    const classes = useStyles();

    const submit = () => {
        Axios.post(backendAddr + 'api/card/remove', {
            id: boardId,
            list_id: listId,
            card_id: cardId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(() => {
            setLoading(true);
            close();
        }).catch(err => {
            console.log(err);
            history.push('/login');
        });
    }

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <div className={classes.root}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h4">
                            Usuwanie karty
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="body1">
                            Czy na pewno chcesz usunąć tę kartę?
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justify="space-evenly">
                        <Grid item>
                            <Button
                                className={classes.green}
                                variant="contained"
                                onClick={submit}
                            >
                                tak
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.red}
                                variant="contained"
                                onClick={close}
                            >
                                nie
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '400px',
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    green: {
        borderRadius: 15,
        backgroundColor: 'lightgreen',
        '&:hover': {
            backgroundColor: 'lime'
        }
    },
    red: {
        borderRadius: 15,
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: '#ff7f7f',
            color: 'black'
        }
    }
}));

export default DeleteCardModal;
