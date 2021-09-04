import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown, Edit, Delete, Archive, Unarchive } from '@material-ui/icons';
import { useState } from "react";
import ArchiveCardModal from "../../components/modals/ArchiveCardModal";
import EditCardModal from "../../components/modals/EditCardModal";
import DeleteCardModal from "../../components/modals/DeleteCardModal";
import CardHistoryModal from "../../components/modals/CardHistoryModal";

export default function Card(props) {
    const classes = useStyles();
    const { data } = props;
    const [dropped, setDropped] = useState(false);
    const [openArchive, setOpenArchive] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);

    const toggleDrop = () => setDropped(!dropped);

    return (
        <Grid item className={classes.width}>
            <div className={classes.root}>
                <div className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        {data.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={toggleDrop}>
                                        {dropped ? <ArrowDropUp /> : <ArrowDropDown />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {dropped ? (
                            <Grid item xs={12} container direction="column" spacing={1}>
                                {data.archived ? (
                                    <Grid item>
                                        <Typography variant="body1">
                                            Zarchiwizowana
                                        </Typography>
                                    </Grid>
                                ) : null}
                                <Grid item className={classes.width} align="center">
                                    <div className={classes.description}>
                                        <Typography variant="body1">
                                            {data.description}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Deadline: {data.deadline ? new Date(data.deadline*1000).toLocaleString('pl-PL', { dateStyle: 'long', timeStyle: 'short' }) : 'brak'}
                                    </Typography>
                                </Grid>
                                <Grid item align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpenHistory(true)}
                                    >
                                        historia aktywności
                                    </Button>
                                </Grid>
                                <Grid item container justify="space-evenly">
                                    <Grid item>
                                        <Button disabled={data.archived} onClick={() => setOpenEdit(true)}>
                                            <Edit />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button disabled={data.archived} onClick={() => setOpenDelete(true)}>
                                            <Delete style={data.archived ? null : { color: 'red' }} />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => setOpenArchive(true)}>
                                            {data.archived ? <Unarchive /> : <Archive />}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                </div>
            </div>
            <ArchiveCardModal open={openArchive} close={() => setOpenArchive(false)} boardId={props.boardId} listId={props.listId} cardId={data.id} archived={data.archived} setLoading={props.setLoading} />
            <EditCardModal open={openEdit} close={() => setOpenEdit(false)} boardId={props.boardId} cardData={data} setLoading={props.setLoading} />
            <DeleteCardModal open={openDelete} close={() => setOpenDelete(false)} boardId={props.boardId} listId={props.listId} cardId={data.id} setLoading={props.setLoading} />
            <CardHistoryModal open={openHistory} close={() => setOpenHistory(false)} boardId={props.boardId} listId={props.listId} cardId={data.id} data={data} />
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    width: {
        maxWidth: '100%'
    },
    root: {
        display: 'flex',
        borderRadius: 10,
        minHeight: '50px',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        padding: 10
    },
    description: {
        maxWidth: '80%',
        backgroundColor: 'lightgray',
        padding: 10,
        wordWrap: 'break-word',
        borderRadius: 10
    },
}))
