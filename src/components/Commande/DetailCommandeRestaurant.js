import React from 'react';
import { Typography, Chip, Avatar, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import DetailCommandeCarte from './DetailCommandeCarte';
import DetailCommandeMenu from './DetailCommandeMenu';

function DetailCommandeRestaurant(props) {
    let date = new Date().toISOString().slice(0,10);
    let commande = props.item || {carte:{}, menu:{}, isConfirmed:false};
    var totalCarteValue = 0;
    let carte = Object.keys(commande['carte'] || {}).map((i)=>{
        let item = commande['carte'][i];
        let totalCarte =  item.item.prix * item.qte;
        totalCarteValue += totalCarte;
        return <DetailCommandeCarte key={i}
            total={totalCarte}
            index={i}
            commande={item}
            removeCommande={props.removeCommandeCarte.bind(props.caller, props._id, item, date)}
            addCommande={props.addCommandeCarte.bind(props.caller, props._id, item, 1, date)}
            substractCommande={props.addCommandeCarte.bind(props.caller, props._id, item, -1, date)} />
    });
    var totalMenuValue = 0;
    let menu = Object.keys(commande['menu'] || {}).map((i)=>{
        let item = commande['menu'][i];
        let detail = Object.keys(item).map((j) => {
            let value = item[j];
            let combinaison = value.horsdoeuvre + value.plat + value.dessert;
            let totalMenu = value.item.prix * value.qte;
            totalMenuValue += totalMenu;
            return <DetailCommandeMenu key={j}
            total = {totalMenu}
            index={j}
            commande={value}
            removeCommande={props.removeCommandeMenu.bind(props.caller, props._id, value, combinaison, date)}
            addCommande={props.addCommandeMenu.bind(props.caller, props._id, value, combinaison, 1, date)}
            substractCommande={props.addCommandeMenu.bind(props.caller, props._id, value, combinaison, -1, date)} />
        })
        return <List key={i}>
          {detail}
        </List>
    });
    props.addTotal(totalCarteValue + totalMenuValue);
    return (
        <div>
            <Typography variant="h6" gutterBottom align="center">Restaurant {props.nomResto}</Typography>          
            <Typography align="center">
                Total : Ar {Intl.NumberFormat().format(totalCarteValue + totalMenuValue)}
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Carte" />
                </ListItem>
                <List>
                    {carte}
                </List>
                <ListItem>
                    <ListItemText primary="Menu" />
                </ListItem>
                {menu}
            </List>
        </div>
    )
}
export default DetailCommandeRestaurant