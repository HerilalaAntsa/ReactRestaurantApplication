import React from 'react';
import { Typography, Badge } from '@material-ui/core';

function DetailCommandeMenu(props){
    return (
        <li onClick={() => props.removeCommande(props.index)} index={props.index}>
        <Badge badgeContent={props.commande.qte} color="secondary">
            <Typography>{props.commande.item.nom}</Typography>
        </Badge>
            <ul>
                <li>Hors d'oeuvre : {props.commande.item.horsdoeuvre[props.commande.horsdoeuvre].nom}</li>
                <li>Plat : {props.commande.item.plat[props.commande.plat].nom}</li>
                <li>Dessert : {props.commande.item.dessert[props.commande.dessert].nom}</li>
            </ul>
        </li>
    )
}
export default DetailCommandeMenu