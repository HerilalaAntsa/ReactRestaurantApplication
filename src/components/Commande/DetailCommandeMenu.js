import React from 'react';
import { Typography, Badge, IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function DetailCommandeMenu(props) {
    return (
        <li index={props.index}>
            <Badge badgeContent={props.commande.qte} color="secondary">
                <Typography>{props.commande.item.nom}</Typography>
            </Badge>
            <Tooltip title="Ajouter la quantité">
                <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                    <AddCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Réduire la quantité">
                <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Retirer le menu">
                <IconButton onClick={props.removeCommande} aria-label="Delete">
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
            <ul>
                <li>Hors d'oeuvre : {props.commande.item.horsdoeuvre[props.commande.horsdoeuvre].nom}</li>
                <li>Plat : {props.commande.item.plat[props.commande.plat].nom}</li>
                <li>Dessert : {props.commande.item.dessert[props.commande.dessert].nom}</li>
            </ul>
            <Typography>Ar {Intl.NumberFormat().format(props.commande.item.prix)}</Typography>
            <Typography>total Ar {Intl.NumberFormat().format(props.total)}</Typography>
        </li>
    )
}
export default DetailCommandeMenu