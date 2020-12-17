import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {red} from "@material-ui/core/colors";

export default function Card(props) {
    return (
        <TableRow key={props["name"]}>
            <TableCell style={{Width: 100 + "%"}} align="center">
                <span style={{Width: 100 + "%"}}>{props["name"]}</span>
                <span style={{Right: 0}}>
                {
                    (props["archived"]) ?
                        <DeleteForeverIcon style={{color: red[500]}} onClick={() => {
                            alert("usuwanie");
                        }}/> :
                        <DeleteOutlinedIcon onClick={() => {
                            alert("archiwizowanie");
                        }}/>
                }
                </span>
            </TableCell>
        </TableRow>
    )
}
