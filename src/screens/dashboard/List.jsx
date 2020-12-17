import React from 'react';
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

export default function List(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography align='center' variant='h4' className={classes.Typography}>{props.name}
                <span style={{Right: 0}}>
                {
                    (props["archived"]) ?
                        <span>
                        <DeleteForeverIcon style={{color: red[500]}} onClick={() => {
                            alert("usuwanie");
                        }}/>
                        <ThreeSixtyIcon onClick={() => {
                            alert("odarchiwizowanie");
                        }}/>
                        </span>
                        :
                        <DeleteOutlinedIcon onClick={() => {
                            alert("archiwizowanie");
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
