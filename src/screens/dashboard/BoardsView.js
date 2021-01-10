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
import {backendAddr} from "../../constants/apiConstants";

const useStyles = makeStyles({
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
});

function createData(id, tablename) {
    return {id, tablename};
}

function loadTables(setRows, setLoading) {
    const config = {
        headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
        }
    }
    axios.get(backendAddr + "api/boards", config).then((res) => {
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
    })
}

export default function BoardsView() {
    const classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (isLoading) {
            loadTables(setRows, setLoading);
        }
    })

    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Moje Tablice</Typography>
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