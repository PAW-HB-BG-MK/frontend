import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

export default function NavBar() {
    const classes = useStyles()
    let history = useHistory()

    let logButton;

    if (localStorage.getItem("jwt")) {
        logButton = <Button color="inherit" onClick={() => {
            history.push("/login")
        }}>Login</Button>
    } else {
        logButton = <Button color="inherit" onClick={() => {
            localStorage.clear()
        }}>Logout</Button>
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Trello clone
                    </Typography>

                    {logButton}
                </Toolbar>
            </AppBar>
        </div>
    )
}