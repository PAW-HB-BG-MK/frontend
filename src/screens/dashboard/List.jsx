import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Card from "./Card";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import {red} from "@material-ui/core/colors";
import axios from "axios";
import {backendAddr} from "../../constants/apiConstants";
import {useHistory} from "react-router-dom";

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

function getAxiosConfig() {
    return {
        headers: {
            'content-type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
        }
    }
}

function changeArchivisationState(boardId, listId, isArchived, setArchived, setLoading, history) {
    axios.post(backendAddr + "api/list/change_archive_status", {
        "id": boardId,
        "list_id": listId
    }, getAxiosConfig()).then((res) => {
        setLoading(true)
        setArchived(!isArchived)
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

function removeList(boardId, listId, setLoading, history) {
    axios.post(backendAddr + "api/list/remove", {
        "id": boardId,
        "list_id": listId
    }, getAxiosConfig()).then((res) => {
        setLoading(true)
        window.location.reload()
    }).catch((err) => {
        // TODO: proper exception handling
        console.log(err)
        history.push("/login")
    })
}

export default function List(props) {
    let history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [isArchived, setArchived] = useState(props.archived);

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
    })

    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' className={classes.Typography}>{props.name}
                <span style={{Right: 0}}>
                {
                    (isArchived) ?
                        <span>
                        <DeleteForeverIcon style={{color: red[500]}} onClick={() => {
                            removeList(props.boardId, props.elementId, setLoading, history);
                        }}/>
                        <ThreeSixtyIcon onClick={() => {
                            changeArchivisationState(props.boardId, props.elementId, isArchived, setArchived, setLoading, history);
                        }}/>
                        </span>
                        :
                        <DeleteOutlinedIcon onClick={() => {
                            changeArchivisationState(props.boardId, props.elementId, isArchived, setArchived, setLoading, history);
                        }}/>
                }
                </span>
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {props.cards.map((card) => (
                            <Card elementId={card.id} name={card.name} archived={card.archived}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div align='right' style={{marginTop: "5px"}}>
                <Button disabled={props.archived}>Dodaj</Button>
            </div>

        </Paper>
    )
}
