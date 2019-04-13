import React, { Component } from 'react';
import MenuListItem from './MenuListItem';
import ModalDetail from './ModalDetail';
import ModalCommande from './ModalCommande';
import { Slide, CircularProgress, Dialog, DialogContent } from '@material-ui/core';
import { base } from '../../constants/base';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      menu: {},
      openDetail: false,
      openCommande: false,
      detail: {},
      loading: false,
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
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  componentWillMount() {
    console.log("Will mount");
    // this runs right before the <App> is rendered
    this.ref = base.syncState("menu/" + this.state.id, {
      context: this,
      state: 'menu'
    });
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
      />
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
          resto={this.state.id}
          handleClose={this.handleCloseCommande.bind(this)}
          open={this.state.openCommande}
          toggleLoading={this.toggleLoading.bind(this)}
          Transition={Transition} />
        <Dialog open={this.state.loading} onClose={() => { }} aria-labelledby="Chargement...">
          <DialogContent>
            <CircularProgress size={68} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default MenuList;
