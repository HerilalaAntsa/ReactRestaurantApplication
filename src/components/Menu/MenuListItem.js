import React from 'react';

function MenuListItem(props){
    let dessert = Object.keys(props.item.dessert).map((key)=>{
        let item = props.item.dessert[key];
        return <li key={item._id}>
                    {item.nom}
                </li>
    });
    let plat = Object.keys(props.item.plat).map((key)=>{
        let item = props.item.plat[key];
        return <li key={item._id}>
                    {item.nom}
                </li>
    });
    let horsdoeuvre = Object.keys(props.item.horsdoeuvre).map((key)=>{
        let item = props.item.horsdoeuvre[key];
        return <li key={item._id}>
                    {item.nom}
                </li>
    })
    return (
        <li key={props.item._id} index={props.item.index}>
            {props.item.nom}
            Prix : {props.item.prix}
            <ul>
                Hors d'oeuvre
                {horsdoeuvre}
            </ul>   
            <ul>
                Plat
                {plat}
            </ul>   
            <ul>
                Dessert
                {dessert}
            </ul>
            <p onClick={() => props.handleClickOpenDetail(props.item)}>
                Voir ce menu
            </p>
            <p onClick={() => props.handleClickOpenCommande(props.item)}>
                Commander ce menu
            </p>
        </li>
    )
}
export default MenuListItem;