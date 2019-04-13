import React from 'react';

function CarteListItem(props){
    let plat = Object.keys(props.item).map((key)=>{
        let item = props.item[key];
        return <li key={item._id}>
                    {item.nom}
                </li>
    });
    return (
        <li key={props.item._id} index={props.item.index}>
            {props.item.nom}
            Prix : {props.item.prix}
            Description : {props.item.description}
            Catégorie : {props.item.type}
            
            {props.authentificated
                ?   <p onClick={() => props.handleClickOpenCommande(props.item)}>
                        Commander ce plat
                    </p>
                :   <p onClick={() => props.handleClickOpenLogin(props.item)}>
                        Commander ce plat
                    </p>
            }
        </li>
    )
}
export default CarteListItem;