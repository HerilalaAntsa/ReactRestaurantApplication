import React from 'react';
import { Typography, Badge, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function DetailCommandeMenu(props) {
    let total = props.commande.item.prix * props.commande.qte;
    return (
        <li index={props.index}>
            <Badge badgeContent={props.commande.qte} color="secondary">
                <Typography>{props.commande.item.nom}</Typography>
            </Badge>
            <IconButton onClick={props.removeCommande} aria-label="Delete">
                <DeleteOutlineIcon />
            </IconButton>
            <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                <AddCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                <RemoveCircleOutlineIcon />
            </IconButton>
            <ul>
                <li>Hors d'oeuvre : {props.commande.item.horsdoeuvre[props.commande.horsdoeuvre].nom}</li>
                <li>Plat : {props.commande.item.plat[props.commande.plat].nom}</li>
                <li>Dessert : {props.commande.item.dessert[props.commande.dessert].nom}</li>
            </ul>
            <Typography>Ar {Intl.NumberFormat().format(props.commande.item.prix)}</Typography>
            <Typography>total Ar {Intl.NumberFormat().format(total)}</Typography>
        </li>
    )
}
export default DetailCommandeMenu