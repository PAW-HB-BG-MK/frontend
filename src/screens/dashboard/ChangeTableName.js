import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    paper: {
        maxWidth: 400,
        margin: 'auto',
        overflow: 'hidden',
        marginTop: "20vh",
        flex: 1,
        padding: '3vh',
        background: '#eaeff1',
        marginBottom: '15px'
    },
    inputs:{
        width: "100%",
    }
});



export default function ChangeTableName() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h5'>Zmieniasz Nazwę Tablicy</Typography>
            <labels>
                <input className={classes.inputs} type="text-center"  name="name" />
            </labels>
            <p align='right'>
                <input type="submit" value="Wprowadź" />
            </p>
        </Paper>
    );
}