import React from 'react';
import { Typography, Badge, IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailCommandeCarte from './DetailCommandeCarte';
import DetailCommandeMenu from './DetailCommandeMenu';

function DetailCommandeRestaurant(props) {
    let date = new Date().toISOString().slice(0,10);
    let commande = props.item || {carte:{}, menu:{}, isConfirmed:false};
    var total = 0;
    let carte = Object.keys(commande['carte'] || {}).map((i)=>{
        let item = commande['carte'][i];
        total += item.item.prix * item.qte;
        return <DetailCommandeCarte key={i}
            totalCarte = {total}
            index={i}
            commande={item}
            removeCommande={props.removeCommandeCarte.bind(props.caller, props._id, item, date)}
            addCommande={props.addCommandeCarte.bind(props.caller, props._id, item, 1, date)}
            substractCommande={props.addCommandeCarte.bind(props.caller, props._id, item, -1, date)} />
    });
    props.setTotalCarte(total);
    total = 0;
    let menu = Object.keys(commande['menu'] || {}).map((i)=>{
        let item = commande['menu'][i];
        let detail = Object.keys(item).map((j) => {
            let value = item[j];
            let combinaison = value.horsdoeuvre + value.plat + value.dessert;
            total += item.item.prix * item.qte;
            return <DetailCommandeMenu key={j}
            totalMenu = {total}
            index={j}
            commande={value}
            removeCommande={props.removeCommandeMenu.bind(props.caller, props._id, value, combinaison, date)}
            addCommande={props.addCommandeMenu.bind(props.caller, props._id, value, combinaison, 1, date)}
            substractCommande={props.addCommandeMenu.bind(props.caller, props._id, value, combinaison, -1, date)} />
        })
        props.setTotalMenu(total);
        return <ul key={i}>
          {detail}
        </ul>
    });
    return (
        <div>
            <ul>
                <li key={props._id}>
                    Restaurant : {props.nomResto}
                    <br/>
                    <span>Carte</span>
                        {carte}
                    <span>Menu</span>
                    <ul>
                        {menu}
                    </ul>
                </li>
            </ul>
        <Typography>Total Ar {Intl.NumberFormat().format(props.getTotal())}</Typography>
        </div>
    )
}
export default DetailCommandeRestaurant