import React from 'react';

function DetailCommandeMenu(props){
    return (
        <li onClick={() => props.removeCommande(props.cle)} index={props.index}>
            {props.commande.item.nom}
            <ul>
                <li>Hors d'oeuvre : {props.commande.item.horsdoeuvre[props.commande.horsdoeuvre].nom}</li>
                <li>Plat : {props.commande.item.plat[props.commande.plat].nom}</li>
                <li>Dessert : {props.commande.item.dessert[props.commande.dessert].nom}</li>
            </ul>
        </li>
    )
}
export default DetailCommandeMenu