import { Button, Modal } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import { backendAddr } from "../../constants/apiConstants";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const EditCardModal = ({ open, close, boardId, cardData, setLoading }) => {
    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        description: '',
        deadline: 0
    });

    useEffect(() => {
        const d = new Date(cardData.deadline || Date.now());
        const deadline = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        setValues({
            name: cardData.name,
            description: cardData.description,
            deadline: deadline
        });
    }, [open])

    const submit = () => {
        if (values.name.length < 1 || values.description.length < 1) return;
        Axios.post(backendAddr + 'api/card/edit', {
            id: boardId,
            list_id: cardData.list_id,
            card_id: cardData.id,
            name: values.name,
            description: values.description
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(() => {
            Axios.post(backendAddr + 'api/card/edit/deadline', {
                id: boardId,
                list_id: cardData.list_id,
                card_id: cardData.id,
                deadline: Math.floor(new Date(Date.parse(values.deadline)).getTime() / 1000)
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
                            Edycja karty
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            fullWidth
                            error={values.name.length < 1}
                            defaultValue={cardData.name}
                            onChange={e => setValues({
                                ...values,
                                name: e.currentTarget.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            fullWidth
                            multiline
                            error={values.description.length < 1}
                            defaultValue={cardData.description}
                            onChange={e => setValues({
                                ...values,
                                description: e.currentTarget.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="datetime-local"
                            defaultValue={values.deadline}
                            onChange={e => setValues({
                                ...values,
                                deadline: e.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} container justify="space-evenly">
                        <Grid item>
                            <Button
                                className={classes.green}
                                variant="contained"
                                onClick={submit}
                            >
                                dodaj
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.red}
                                variant="contained"
                                onClick={close}
                            >
                                anuluj
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

export default EditCardModal;
