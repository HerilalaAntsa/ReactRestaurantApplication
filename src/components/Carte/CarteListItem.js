import React from 'react';

function CarteListItem(props){
    return (
        <li key={props.item._id} index={props.item.index}>
            {props.item.nom}
            Prix : {props.item.prix}
            Description : {props.item.description}
            Catégorie : {props.item.type}
            
            <p onClick={() => props.handleClickOpenCommande(props.item)}>
                Commander ce plat
            </p>
        </li>
    )
}
export default CarteListItem;