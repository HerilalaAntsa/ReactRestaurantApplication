import React, { Component } from 'react';
import DetailCommandeMenu from './DetailCommandeMenu';
import { base } from '../../constants/base';
import DetailCommandeCarte from './DetailCommandeCarte';
import { Typography } from '@material-ui/core';

class Commande extends Component {
  constructor(props) {
    super(props);
    this.state = { commande: {}, restaurant: {} }
  }
  removeCommandeCarte(resto, commande) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['carte'][commande.item._id] = null;
    this.setState({
      commande: copieCommande
    })
  }
  removeCommandeMenu(resto, commande, combinaison) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['menu'][commande.item._id][combinaison] = null;
    this.setState({
      commande: copieCommande
    })
  }
  addCommandeCarte(resto, commande, qte){
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['carte'][commande.item._id]['qte'] += qte;
    if(copieCommande[resto]['carte'][commande.item._id]['qte'] <= 0){
      return this.removeCommandeCarte(resto, commande);
    }
    this.setState({
      commande: copieCommande
    })

  }
  addCommandeMenu(resto, commande, combinaison, qte){
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['menu'][commande.item._id][combinaison]['qte'] += qte;
    if(copieCommande[resto]['menu'][commande.item._id][combinaison]['qte'] <= 0){
      return this.removeCommandeMenu(resto, commande, combinaison);
    }else
    this.setState({
      commande: copieCommande
    })
  }
  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("commande", {
      context: this,
      state: 'commande'
    });
    this.refResto = base.bindToState("restaurant", {
      context: this,
      state: 'restaurant'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
    base.removeBinding(this.refResto);
  }

  render() {
    let total = 0;
    let listcommande = Object.keys(this.state.commande).map((key) => {
      let restaurant = this.state.commande[key];
      let restaurantValue = this.state.restaurant[key] || {nom:key};
      let categorie = Object.keys(restaurant).map((cat) => {
        let detailCommande = [];
        switch (cat) {
          case 'menu': detailCommande = Object.keys(restaurant[cat]).map((i) => {
            let item = restaurant[cat][i];
            let detail = Object.keys(item).map((j)=>{
              let value = item[j];
              let combinaison = value.horsdoeuvre+value.plat+value.dessert;
              total += value.item.prix * value.qte;
              return <DetailCommandeMenu key={j}
              index = {j}
              commande = {value}
              removeCommande = {this.removeCommandeMenu.bind(this, key, value, combinaison)}
              addCommande = {this.addCommandeMenu.bind(this, key, value, combinaison, 1)} 
              substractCommande = {this.addCommandeMenu.bind(this, key, value, combinaison, -1)} />
            })
            return <ul key={i}>
                        {detail}
                      </ul>
          });break;
          case 'carte': detailCommande = Object.keys(restaurant[cat]).map((i) => {
            let item = restaurant[cat][i];
            total += item.item.prix * item.qte;
              return <DetailCommandeCarte key={i}
              index = {i}
              commande = {item}
              removeCommande = {this.removeCommandeCarte.bind(this, key, item)}
              addCommande = {this.addCommandeCarte.bind(this, key, item, 1)}
              substractCommande = {this.addCommandeCarte.bind(this, key, item, -1)} />
          });break;
          default:;
        }
        return <li key={cat}>
          <span style={{textTransform: 'capitalize'}}>{cat}</span>
          <ul>
            {detailCommande}
          </ul>
        </li>
      })
      return <li key={key}>
        {restaurantValue.nom}
        <ul>
          {categorie}
        </ul>
      </li>
    })
    return (
      <div className="App">
        <div>
          <h2>Liste des commande</h2>
          Nombre de commande : {listcommande.length}
          <ul>
            {listcommande}
          </ul>
          <Typography>Total Ar {Intl.NumberFormat().format(total)}</Typography>
        </div>
      </div>
    );
  }
}

export default Commande;
