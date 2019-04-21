import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import StepperCommande from './StepperCommande';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';

class ModalCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      commande: {},
    }
  }
  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        var dateNow = new Date().toISOString().slice(0, 10);
        this.ref = base.syncState("commande/" + user.uid + '/' + dateNow, {
          context: this,
          state: 'commande'
        })
        this.setState({
          user: user,
        })
      } else {
        this.setState({ user: {} });
      }
    });
  }
  componentWillUnmount() {
    console.log("Will unmount");
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }
  commandeComplete() {
    return !(
      (typeof this.state.horsdoeuvre !== 'undefined' && this.state.horsdoeuvre !== null)
      && (typeof this.state.plat !== 'undefined' && this.state.plat !== null)
      && (typeof this.state.dessert !== 'undefined' && this.state.dessert !== null)
    )
  }
  addCommande() {
    var user = app.auth().currentUser;
    if (user) {
      this.saveCommande();
    } else {
      app.auth().signInAnonymously()
        .then((cred) => {
          //Est appelé avant le listener on authstatechanged
          var dateNow = new Date().toISOString().slice(0, 10);
          this.ref = base.syncState("commande/" + cred.user.uid + '/' + dateNow, {
            context: this,
            state: 'commande',
          })
          this.saveCommande();
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
  saveCommande() {
    this.props.toggleLoading(true);
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[this.props.resto] = copieCommande[this.props.resto] || { 'menu': {}, 'carte': {} };
    copieCommande[this.props.resto]['menu'] = copieCommande[this.props.resto]['menu'] || {};
    copieCommande[this.props.resto]['isConfirmed'] = false;
    copieCommande[this.props.resto]['menu'][this.props.menu._id] = copieCommande[this.props.resto]['menu'][this.props.menu._id] || {};
    let key = this.state.horsdoeuvre + this.state.plat + this.state.dessert;
    copieCommande[this.props.resto]['menu'][this.props.menu._id][key] = copieCommande[this.props.resto]['menu'][this.props.menu._id][key] || {};
    let qte = copieCommande[this.props.resto]['menu'][this.props.menu._id][key]['qte'] || 0;
    let newCommande = {
      'qte': qte + 1,
      'horsdoeuvre': this.state.horsdoeuvre,
      'plat': this.state.plat,
      'dessert': this.state.dessert,
      'item': this.props.menu
    }
    copieCommande[this.props.resto]['menu'][this.props.menu._id][key] = newCommande;
    this.setState({
      commande: copieCommande,
      horsdoeuvre: undefined,
      plat: undefined,
      dessert: undefined,
    });
    this.props.toggleLoading(false);
    this.props.handleClose();
    this.props.enqueueSnackbar("Le menu \" " + this.props.menu.nom + " \" a été correctement ajouté à la commande",
      {
        variant: 'default',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
  }
  handleClose() {
    this.props.handleClose();
    this.setState({
      horsdoeuvre: undefined,
      plat: undefined,
      dessert: undefined,
    })
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        TransitionComponent={this.props.Transition}
        aria-labelledby="commande"
        scroll="body"
      >
        <DialogTitle id="commande">Commander "{this.props.menu.nom}"
        <Typography>
            Ar {Intl.NumberFormat().format(this.props.menu.prix)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <StepperCommande menu={this.props.menu} commandeState={this.setState.bind(this)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            Annuler
          </Button>
          <Button disabled={this.commandeComplete()} onClick={this.addCommande.bind(this)} color="primary">
            Soumettre le menu
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
export default withSnackbar(ModalCommande)