import React, {useState} from 'react';
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

function useForceUpdate() {
    const [, setValue] = useState(0)
    return () => setValue(value => ++value)
}

export default function NavBar() {
    const classes = useStyles()
    let history = useHistory()
    const forceUpdate = useForceUpdate()

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

                    {(localStorage.getItem("jwt") === null) ? <Button color="inherit" onClick={() => {
                            history.push("/login")
                        }}>Zaloguj</Button>
                        :
                        <Button color="inherit" onClick={() => {
                            localStorage.clear()
                            history.push("/")
                            forceUpdate()
                        }}>Wyloguj</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )
}