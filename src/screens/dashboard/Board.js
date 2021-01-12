import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import List from "./List";
import axios from "axios";
import {backendAddr} from "../../constants/apiConstants";
import {Button, Input} from "@material-ui/core";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CreateIcon from '@material-ui/icons/Create';

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

function editBoard(boardId, tableName, setLoading, history) {
    axios.post(backendAddr + "api/board/edit", {"id": boardId, "name": tableName}, getAxiosConfig()).then((res) => {
        setLoading(true);
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function addList(boardId, listName, setLoading, history) {
    axios.post(backendAddr + "api/list/add", {"id": boardId, "name": listName}, getAxiosConfig()).then((res) => {
        setLoading(true);
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function getBoardData(boardId, setBoardData, setLoading, history) {
    axios.get(backendAddr + "api/board?id=" + boardId, getAxiosConfig()).then((res) => {
        res.data.lists.forEach(list => {
            list.cards.sort((a, b) => (a.list_id > b.list_id) ? 1 : -1)
        })
        setBoardData(res.data);
        setLoading(false)
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

export default function Board() {
    const classes = useStyles();
    let {boardId} = useParams();
    let history = useHistory();

    const [isLoading, setLoading] = useState(true);
    const [editingBoard, setEditingBoard] = useState(false)
    const [newName, setNewName] = useState("");
    const [boardData, setBoardData] = useState(null)
    const [adddingList, setAddingList] = useState(false)
    const [newList, setNewList] = useState("")

    const editBoardClick = () => {
        setEditingBoard(true)
        setAddingList(false)
    }

    const editBoardNameHandler = (event) => {
        setNewName(event.currentTarget.value);
    }

    const newListNameHandler = (event) => {
        setNewList(event.currentTarget.value);
    }

    const addListHandler = () => {
        setEditingBoard(false)
        setAddingList(true)
    }

    useEffect(() => {
        if (isLoading) {
            getBoardData(boardId, setBoardData, setLoading, history);
        }
    })


    const editBoardNameButtonHandler = () => {
        editBoard(boardId, newName.toString(), setLoading, history);
        setNewName("");
        setEditingBoard(false);
    }

    const newListNameButtonHandler = () => {
        addList(boardId, newList.toString(), setLoading, history);
        setAddingList(false);
        setNewList("")
    }

    let addListComp = <Button
        variant="contained"
        color="primary"
        onClick={addListHandler}
    >Dodaj liste</Button>
    if (adddingList) {
        addListComp = <div><Input id="newList" onChange={newListNameHandler} fullWidth={true}
                                  placeholder="Nazwa listy"/>
            <Button onClick={newListNameButtonHandler} fullWidth={true} variant="contained"
                    className={classes.submit}
                    color="primary">Utwórz</Button></div>
    }
    let editBoardComp = null
    if (editingBoard) {
        editBoardComp =
            <div><Input id="newName" onChange={editBoardNameHandler} fullWidth={true}
                        placeholder="Nazwa tablicy"/>
                <Button onClick={editBoardNameButtonHandler} fullWidth={true} variant="contained"
                        className={classes.submit}
                        color="primary">Utwórz</Button></div>
    }
    return (
        <div>
            <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12}>
                    <Typography align='center' variant='h2'
                                className={classes.Typography}>{(boardData) ? boardData.name : "ładowanie..."}
                        <Button
                            color="primary"
                            onClick={editBoardClick}
                        > <CreateIcon/>
                        </Button>
                    </Typography>
                    {editBoardComp}
                    <Grid container justify="center" spacing={6}>
                        {(boardData) ? boardData.lists.map((list) => (
                            <List boardId={boardId} elementId={list.id} name={list.name} archived={list.archived} cards={list.cards}/>
                        )) : <Paper className={classes.paper}>
                            ładowanie...</Paper>}
                    </Grid>
                </Grid>
            </Grid>
            {addListComp}
        </div>
    );
}
