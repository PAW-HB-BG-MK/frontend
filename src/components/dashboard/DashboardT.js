import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

function createData(tablename) {
    return { tablename };
}

const rows = [
    createData('Kamil_tabelka'),
    createData('Tomek_tabelka'),
    createData( 'Odrodzenie Adolfa Kudlinskiego projekt'),

];

export default function SimpleTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' style={{marginBottom: "15px"}}>Moje Tablice</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.tablename}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}