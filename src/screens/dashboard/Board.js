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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '2%'
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
    container: {
        height: '100%',
    }
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
        res.data.lists.sort((a, b) => a.order - b.order)
        setBoardData(res.data);
        setLoading(false)
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function addUser(boardId, email, setLoading, history) {
    axios.post(backendAddr + "api/board/add_user", {"board_id": boardId, "email": email}, getAxiosConfig()).then((res) => {
        setLoading(true);
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
    const [addingUser, setAddingUser] = useState(false)
    const [newUser, setNewUser] = useState("")

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

    const load = () => setLoading(true);

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

    const addUserHandler = () => {
        setAddingUser(true)
    }

    const editUserEmailHandler = (e) => {
        setNewUser(e.currentTarget.value)
    }

    const addUserButtonHandler = () => {
        addUser(boardId, newUser.toString(), setLoading, history);
        setAddingUser(false);
        setNewUser("");
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
    let addUserComp = <Button
        variant="contained"
        color="primary"
        onClick={addUserHandler}
        >
            dodaj użytkownika
        </Button>
    if (addingUser) {
        addUserComp =
        <div><Input id="addUser" onChange={editUserEmailHandler} fullWidth={true}
                    placeholder="Email"/>
            <Button onClick={addUserButtonHandler} fullWidth={true} variant="contained"
                    className={classes.submit}
                    color="primary">dodaj</Button></div>
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
                </Grid>
                <Grid item xs={12}>
                    {addUserComp}
                </Grid>
                <Grid className={classes.container} item xs={12}>
                    <DndProvider backend={HTML5Backend}>
                        <Grid container justify="center" spacing={4}>
                            {(boardData) ? boardData.lists.map((list) => (
                                <List key={list.id} boardId={boardId} elementId={list.id} name={list.name} archived={list.archived} cards={list.cards} load={load} pos={list.order} />
                            )) : <Paper className={classes.paper}>
                            ładowanie...</Paper>}
                        </Grid>
                    </DndProvider>
                </Grid>
                <Grid item xs={12}>
                    {addListComp}
                </Grid>
            </Grid>
        </div>
    );
}
