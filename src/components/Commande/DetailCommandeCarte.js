import React from 'react';
import { Typography, Badge, IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';

function DetailCommandeCarte(props) {
    let total = props.commande.item.prix * props.commande.qte;
    return (
        <li index={props.index}>
            <Badge badgeContent={props.commande.qte} color="secondary">
                <Typography>{props.commande.item.nom}</Typography>
                <Typography> - {props.commande.item.type}</Typography>
            </Badge>
            <IconButton onClick={props.removeCommande} aria-label="Delete">
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                <AddShoppingCartIcon />
            </IconButton>
            <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                <RemoveShoppingCartIcon />
            </IconButton>
            <Typography>Ar {Intl.NumberFormat().format(props.commande.item.prix)}</Typography>
            <Typography>total Ar {Intl.NumberFormat().format(total)}</Typography>
        </li>
    )
}
export default DetailCommandeCarte