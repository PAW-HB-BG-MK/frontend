import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import List from "./List";

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

function createData(id, name, archived) {
    return {id, name, archived};
}

const lists = [{
    name: "Do zrobienia",
    id: 1,
    archived: true,
    cards: [
        createData(1, 'Uruchomienie AutoDeployu', false),
    ]
}, {
    name: "W trakcie",
    id: 2,
    archived: true,
    cards: [
        createData(2, 'Stworzenie Bazy Danych', false),
        createData(3, 'Wypełnienie Bazy Danych', true),
    ]
}, {
    name: "Zrobione",
    id: 3,
    archived: false,
    cards: [
        createData(4, 'Zainicjalizowanie backu', true),
        createData(5, 'Zainicjalizowanie frontu', false),
        createData(6, 'Stworzenie Repozytorium', false),
    ]
}]

export default function TableCheckOut() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={4}>
            <Grid item xs={12}>
                <Typography align='center' variant='h2' className={classes.Typography}>Tomek tabelka</Typography>
                <Grid container justify="center" spacing={6}>
                    {lists.map((list) => (
                        <List elementId={list.id} name={list.name} archived={list.archived} cards={list.cards}/>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
