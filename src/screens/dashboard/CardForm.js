import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
    paper: {
        maxWidth: 400,
        margin: 'auto',
        overflow: 'hidden',
        marginTop: "5vh",
        flex: 1,
        padding: '3vh',
        background: '#eaeff1',
        marginBottom: '15px'
    },
});



export default function AddTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Container component="main" maxWidth="xl">
                <Typography component="h1"  align='center' variant="h5">Dodajesz Nową Kartę
                </Typography>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="Id"
                            name="id"
                            autoComplete="id"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Nazwa"
                            label="Nazwa"
                            type="Nazwa"
                            id="Nazwa"
                            autoComplete="Nazwa"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Opis"
                            label="Opis"
                            type="Opis"
                            id="Ppis"
                            autoComplete="Opis"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Data"
                            label="Data"
                            type="Data"
                            id="Data"
                            autoComplete="Data"
                        />
                        <Button fullWidth variant="contained" color="primary">Dodaj
                        </Button>
                        <Grid container>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Paper>
    );
}