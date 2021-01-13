import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {backendAddr} from "../constants/apiConstants";
import {useHistory} from "react-router-dom";
import {Button, Input} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    paper: {
        maxWidth: 1260,
        margin: 'auto',
        overflow: 'hidden',
        marginTop: "10vh",
        flex: 1,
        padding: '3vh',
        background: '#eaeff1',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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

function createData(id, tablename) {
    return {id, tablename};
}

function loadTables(setRows, setLoading, history) {
    axios.get(backendAddr + "api/boards", getAxiosConfig()).then((res) => {
        let stuff = []
        console.log(res.data.data);
        res.data.data.forEach((elem) => {
            stuff.push(createData(elem.id, elem.name));
        })
        setRows(stuff);
        setLoading(false);
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function addTable(tableName, setLoading, history) {
    axios.post(backendAddr + "api/board/add", {"name": tableName}, getAxiosConfig()).then((res) => {
        setLoading(true);
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function editTable(tableId, tableName, setLoading, history) {
    axios.post(backendAddr + "api/board/edit", {"id": tableId, "name": tableName}, getAxiosConfig()).then((res) => {
        setLoading(true);
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

export default function Boards() {
    const classes = useStyles();
    let history = useHistory();

    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [addingTable, setAddingTable] = useState(false);
    const [editingTable, setEditingTable] = useState(false);
    const [newName, setNewName] = useState("");

    const addTableClick = () => {
        setEditingTable(false);
        setAddingTable(true);
    }
    const editTableClick = () => {
        setEditingTable(true);
        setAddingTable(false);
    }
    useEffect(() => {
        if (isLoading) {
            loadTables(setRows, setLoading, history);
        }
    })

    const newNameHandler = (event) => {
        setNewName(event.currentTarget.value);
    }

    const newNameButtonHandler = () => {
        addTable(newName.toString(), setLoading, history);
        setNewName("");
        setAddingTable(false);
    }

    let addTableComp = null
    if (addingTable) {
        addTableComp =
            <div><Input id="newName" onChange={newNameHandler} fullWidth={true} placeholder="Nazwa tablicy"></Input>
                <Button onClick={newNameButtonHandler} fullWidth={true} variant="contained" className={classes.submit}
                        color="primary">Utwórz</Button></div>
    }
    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Moje Tablice
                <Button
                    color="primary"
                    onClick={addTableClick}
                >Dodaj</Button>
            </Typography>
            {addTableComp}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {(!isLoading) ? rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.tablename}</TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell align="center">ładowanie</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}