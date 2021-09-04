import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown, Edit, Delete, Archive, Unarchive } from '@material-ui/icons';
import { useState } from "react";

export default function Card({ data }) {
    const classes = useStyles();
    const [dropped, setDropped] = useState(false);

    const toggleDrop = () => setDropped(!dropped);

    return (
        <Grid item className={classes.width}>
            <div className={classes.root}>
                <div className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        {data.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={toggleDrop}>
                                        {dropped ? <ArrowDropUp /> : <ArrowDropDown />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {dropped ? (
                            <Grid item xs={12} container direction="column" spacing={1}>
                                {data.archived ? (
                                    <Grid item>
                                        <Typography variant="body1">
                                            Zarchiwizowana
                                        </Typography>
                                    </Grid>
                                ) : null}
                                <Grid item className={classes.width} align="center">
                                    <div className={classes.description}>
                                        <Typography variant="body1">
                                            {data.description}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Deadline: {data.deadline ? '...' : 'brak'}
                                    </Typography>
                                </Grid>
                                <Grid item container justify="space-evenly">
                                    <Grid item>
                                        <Button disabled={data.archived}>
                                            <Edit />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button disabled={data.archived}>
                                            <Delete style={data.archived ? null : { color: 'red' }} />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button>
                                            {data.archived ? <Unarchive /> : <Archive />}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                </div>
            </div>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    width: {
        maxWidth: '100%'
    },
    root: {
        display: 'flex',
        borderRadius: 10,
        minHeight: '50px',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        padding: 10
    },
    description: {
        maxWidth: '80%',
        backgroundColor: 'lightgray',
        padding: 10,
        wordWrap: 'break-word'
    },
}))
