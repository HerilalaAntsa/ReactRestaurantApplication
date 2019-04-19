import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import StepperCommande from './StepperCommande';
import { app, base} from '../../constants/base';
import { withSnackbar } from 'notistack';

class ModalCommande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: {},
    }
  }
  componentWillMount() {
    this.ref = base.syncState("commande", {
      context: this,
      state: 'commande'
    })
  }
  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }
  commandeComplete() {
    return !(
      (typeof this.state.horsdoeuvre !== 'undefined' && this.state.horsdoeuvre !== null)
      && (typeof this.state.plat !== 'undefined' && this.state.plat !== null)
      && (typeof this.state.dessert !== 'undefined' && this.state.dessert !== null)
    )
  }
  addCommande() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authentificated: true,
        })
        this.saveCommande();
      } else {
        app.auth().signInAnonymously()
          .then(() => {
            this.setState({
              authentificated: true,
            });
            this.saveCommande();
          })
          .catch((error) => {
            console.log(error.message)
          })
      }
    });
  }
  saveCommande() {
    this.props.toggleLoading(true);
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    var dateNow = new Date().toISOString().slice(0,10);
    var currentUser = app.auth().currentUser.uid;
    copieCommande[currentUser] = copieCommande[currentUser] || {};
    copieCommande[currentUser][dateNow]= copieCommande[currentUser][dateNow] || {};
    copieCommande[currentUser][dateNow][this.props.resto] = copieCommande[currentUser][this.props.resto] || { 'menu': {}, 'carte': {} };
    copieCommande[currentUser][dateNow][this.props.resto]['menu'] = copieCommande[currentUser][dateNow][this.props.resto]['menu'] || {};
    copieCommande[currentUser][dateNow][this.props.resto]['isConfirmed'] = false;
    copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id] = copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id] || {};
    let key = this.state.horsdoeuvre + this.state.plat + this.state.dessert;
    copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id][key] = copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id][key] || {};
    let qte = copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id][key]['qte'] || 0;
    let newCommande = {
      'qte': qte + 1,
      'horsdoeuvre': this.state.horsdoeuvre,
      'plat': this.state.plat,
      'dessert': this.state.dessert,
      'item': this.props.menu
    }
    copieCommande[currentUser][dateNow][this.props.resto]['menu'][this.props.menu._id][key] = newCommande;
    this.setState({
      commande: copieCommande
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
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={this.props.Transition}
        aria-labelledby="commande"
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
          <Button onClick={this.props.handleClose} color="primary">
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