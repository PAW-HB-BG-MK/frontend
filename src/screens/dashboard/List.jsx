import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Card from "./Card";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import {red} from "@material-ui/core/colors";
import axios from "axios";
import {backendAddr} from "../../constants/apiConstants";
import {useHistory} from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import {Input} from "@material-ui/core";
import AddCardModal from './AddCardModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 300,
        width: 100,
        margin: 'auto',
        overflow: 'hidden',
        marginTop: "10vh",
        flex: 1,
        padding: '4vh',
        background: '#eaeff1',
    },
    control: {
        padding: theme.spacing(2),
    },
    Typography: {
        marginBottom: '15px',
        marginTop: '5px'
    },
}));

function getAxiosConfig() {
    return {
        headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
        }
    }
}

function changeArchivisationState(boardId, listId, isArchived, setArchived, setLoading, history) {
    axios.post(backendAddr + "api/list/change_archive_status", {
        "id": boardId,
        "list_id": listId
    }, getAxiosConfig()).then((res) => {
        setLoading(true)
        setArchived(!isArchived)
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function editList(boardId, listId, listName, setLoading, history) {
    axios.post(backendAddr + "api/list/edit/name", {
        "id": boardId,
        "list_id": listId,
        "name": listName
    }, getAxiosConfig()).then((res) => {
        setLoading(true);
        window.location.reload()
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function removeList(boardId, listId, setLoading, history) {
    axios.post(backendAddr + "api/list/remove", {
        "id": boardId,
        "list_id": listId
    }, getAxiosConfig()).then((res) => {
        setLoading(true)
        window.location.reload()
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

export default function List(props) {
    let history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [isArchived, setArchived] = useState(props.archived);
    const [editingList, setEditingList] = useState(false)
    const [newName, setNewName] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (loading) {
            setLoading(false);
            props.load();
        }
        console.log(props.cards);
    })

    const editListClick = () => {
        setEditingList(true)
    }

    const editBoardNameHandler = (event) => {
        setNewName(event.currentTarget.value);
    }

    const editBoardNameButtonHandler = () => {
        editList(props.boardId, props.elementId, newName.toString(), setLoading, history);
        setNewName("");
        setEditingList(false);
    }

    let editListComp = null

    if (editingList) {
        editListComp =
            <div><Input id="newName" onChange={editBoardNameHandler} fullWidth={true}
                        placeholder="Nazwa tablicy"/>
                <Button onClick={editBoardNameButtonHandler} fullWidth={true} variant="contained"
                        className={classes.submit}
                        color="primary">Utwórz</Button></div>
    }

    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' className={classes.Typography}>{props.name}
                <span style={{Right: 0}}>
                {
                    (isArchived) ?
                        <span>
                        <DeleteForeverIcon style={{color: red[500]}} onClick={() => {
                            removeList(props.boardId, props.elementId, setLoading, history);
                        }}/>
                        <ThreeSixtyIcon onClick={() => {
                            changeArchivisationState(props.boardId, props.elementId, isArchived, setArchived, setLoading, history);
                        }}/>
                        </span>
                        :
                        <span>
                            <Button
                                color="primary"
                                onClick={editListClick}
                            > <CreateIcon/>
                        </Button>
                        <DeleteOutlinedIcon onClick={() => {
                            changeArchivisationState(props.boardId, props.elementId, isArchived, setArchived, setLoading, history);
                        }}/></span>
                }
                </span>
            </Typography>
            {editListComp}
            <div align='right' style={{marginTop: "5px"}}>
                <Button
                    variant="contained"
                    color="primary" 
                    disabled={isArchived}
                    onClick={() => setOpen(true)}
                >
                    Dodaj
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {props.cards.map((card) => (
                            <Card key={card.id} elementId={card.id} name={card.name} archived={card.archived}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddCardModal open={open} close={() => setOpen(false)} boardId={props.boardId} listId={props.elementId} setLoading={setLoading} />
        </Paper>
    )
}
