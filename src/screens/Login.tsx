import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {backendAddr} from "../constants/apiConstants"
import axios from "axios"
import {useHistory} from 'react-router-dom'
import {Paper} from "@material-ui/core"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://paw.rehost.pl/">
                paw.rehost.pl
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "96vh",
        backgroundImage: "url(https://i.pinimg.com/originals/6a/7f/cd/6a7fcd21fd016f93f14b7e7d45978e52.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: theme.spacing(8),
    },
    paper: {
        //marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(5),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Login() {
    const classes = useStyles();

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value)
    }
    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }
    const submitHandler = (_: React.MouseEvent) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        axios.post(backendAddr + "auth/sign_in", {
            "auth": {
                "email": login,
                "password": password
            }
        }, config).then((res) => {
            if (res.status !== 201) {
                setPassword("")
                return
            }
            localStorage.setItem("jwt", res.data['jwt'])
            history.push("/dashboard/tables")
        }).catch((err) => {
            // TODO: proper exception handling
            console.log(err)
        })
    }


    return (
        <div className={classes.root}>
            <Paper style={{marginLeft: "30%", marginRight: "30%"}}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Zaloguj się
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Login"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={login}
                                onChange={loginChangeHandler}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={passwordChangeHandler}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={submitHandler}
                            >
                                Zaloguj
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Zapomniałem hasła
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Nie masz konta? Zarejestruj się"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8} style={{paddingBottom: 20}}>
                        <Copyright/>
                    </Box>
                </Container>
            </Paper>
            <h1 style={{
                width: "100%",
                fontFamily: "impact",
                position: "absolute",
                bottom: "-54px",
                color: "white",
                fontSize: "80px",
                textAlign: "center",

            }}>
                Tekst dolny
            </h1>
        </div>
    )
}
