import React from 'react';
import {Link} from 'react-router-dom';
import {MENURESTAURANTDETAIL, COMMANDERMENU} from '../../constants/routes';

function MenuList(props){
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
            <Link to={MENURESTAURANTDETAIL + '/' + props.id + '/' + props.item._id}>
                Voir ce menu
            </Link>
            <Link to={COMMANDERMENU + '/' + props.id + '/' + props.item._id + '/commander'}>
                Commander ce menu
            </Link>
        </li>
    )
}
export default MenuList