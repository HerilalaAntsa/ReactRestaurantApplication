import React, { Component } from 'react';
import base from '../../constants/base';
import DetailCommandeMenu from './DetailCommandeMenu'

class Commande extends Component {
  constructor(props) {
    super(props);
    this.state = { commande: {} }
  }
  removeCommande(key) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[key] = null;
    this.setState({
      commande: copieCommande
    })
  }

  addCommande(key) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object

    copieCommande[key].qte = copieCommande[key].qte + 1;
    this.setState({
      commande: copieCommande
    });
    console.log("commande added" + this.state.commande);
    this.input.value = '';
  }

  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("commande", {
      context: this,
      state: 'commande'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    let listcommande = Object.keys(this.state.commande).map((key) => {
      let restaurant = this.state.commande[key];
      let categorie = Object.keys(restaurant).map((cat) => {
        let detailCommande = [];
        switch (cat) {
          case 'menu': detailCommande = Object.keys(restaurant[cat]).map((i) => {
            let item = restaurant[cat][i];
            let detail = Object.keys(item).map((j)=>{
              let value = item[j];
              return <DetailCommandeMenu key={j}
              index={j}
              commande={value}
              removeCommande={this.removeCommande.bind(this)} />
            })
            return <ul key={i}>
                        {detail}
                      </ul>
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
        {key}
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
        </div>
      </div>
    );
  }
}

export default Commande;
