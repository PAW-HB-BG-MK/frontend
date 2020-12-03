import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
    Typography:{
       marginBottom: '15px',
        marginTop: '5px'
    },
}));
function createData(tablename) {
    return { tablename };
}

const rows = [
    createData('Uruchomienie AutoDeployu'),
];
const rows2 = [
    createData('Stworzenie Bazy Danych'),
    createData('Wypełnienie Bazy Danych'),
];
const rows3 = [
    createData('Zainicjalizowanie backu'),
    createData('Zainicjalizowanie frontu'),
    createData( 'Stworzenie Repozytorium'),

];
export default function TableCheckOut() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={4}>
            <Grid item xs={12}>
                <Typography align='center' variant='h2'className={classes.Typography} >Tomek tabelka</Typography>
                <Grid container justify="center" spacing={6}>
                    <Paper className={classes.paper}>
                        <Typography align='center' variant='h4'className={classes.Typography} >Zadania</Typography>
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
                        <div align='right' style={{marginTop: "5px"}}>
                            <button>Dodaj</button>
                        </div>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography align='center' variant='h4' className={classes.Typography}>W Trakcie</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell align="center">{row.tablename}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div align='right' style={{marginTop: "5px"}}>
                            <button>Dodaj</button>
                        </div>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography align='center' variant='h4' className={classes.Typography}>Skończone</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    {rows3.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell align="center">{row.tablename}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div align='right' style={{marginTop: "5px"}}>
                            <button>Dodaj</button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}