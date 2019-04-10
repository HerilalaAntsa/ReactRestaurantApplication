import React, { Component } from 'react';
import MenuListItem from './MenuListItem';
import base from '../../constants/base';
import ModalDetail from './ModalDetail';
import ModalCommande from './ModalCommande';
import { Slide } from '@material-ui/core';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      menu: {}, commande: {},
      openDetail: false,
      openCommande: false ,
      detail: {}
    }
  }
  handleClickOpenDetail(menu) {
    this.setState({ openDetail: true, detail: menu });
  }
  handleClickOpenCommande(menu) {
    this.setState({ openCommande: true, detail: menu });
  }
  handleCloseCommande() {
    this.setState({ openCommande: false });
  }
  handleCloseDetail() {
    this.setState({ openDetail: false });
  }
  addCommande(item, horsdoeuvre, plat, dessert) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    if (copieCommande[this.state.id]) {
      if (copieCommande[this.state.id]['menu'][item._id]) {
        copieCommande[this.state.id]['menu'][item._id]['qte'] += 1;
      }
    } else {
      copieCommande[this.state.id] = {
        'menu': {},
        'carte': {}
      }
      copieCommande[this.state.id]['menu'][item._id] = {
        'qte': 1,
        'prix': item.prix,
        'horsdoeuvre': horsdoeuvre,
        'plat': plat,
        'dessert': dessert,
        'item': item
      }

    }
    this.setState({
      commande: copieCommande
    });
    console.log("commande added" + this.state.commande);
  }

  componentWillMount() {
    console.log("Will mount");
    // this runs right before the <App> is rendered
    this.ref = base.syncState("menu/" + this.state.id, {
      context: this,
      state: 'menu'
    });
    this.refCommande = base.syncState("commande", {
      context: this,
      state: 'commande'
    })
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    let menu = Object.keys(this.state.menu).map((key) => {
      let item = this.state.menu[key];
      return <MenuListItem
        key={key}
        id={this.state.id}
        item={item}
        handleClickOpenDetail={this.handleClickOpenDetail.bind(this)}
        handleClickOpenCommande={this.handleClickOpenCommande.bind(this)}
        addCommande={this.addCommande.bind(this)} />
    })
    return (
      <div className="MenuList">
        <h1>Les Menus Proposés</h1>
        <ul>
          {menu}
        </ul>
        <ModalDetail
          menu={this.state.detail}
          handleClose={this.handleCloseDetail.bind(this)}
          open={this.state.openDetail}
          Transition={Transition} />
        <ModalCommande
          menu={this.state.detail}
          handleClose={this.handleCloseCommande.bind(this)}
          open={this.state.openCommande}
          Transition={Transition} />
      </div>
    );
  }
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default MenuList;
