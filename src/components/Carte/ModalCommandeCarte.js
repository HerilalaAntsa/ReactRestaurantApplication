import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';

class ModalCommandeCarte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: {},
      user: {},
    }
  }
  componentWillMount() {    
    app.auth().onAuthStateChanged(user => {      
      if (user) {
        var dateNow = new Date().toISOString().slice(0,10);
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
    if(this.ref){
      base.removeBinding(this.ref);
    }
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
    copieCommande[this.props.resto]['carte'] = copieCommande[this.props.resto]['carte'] || {};
    copieCommande[this.props.resto]['isConfirmed'] = false;
    copieCommande[this.props.resto]['carte'][this.props.carte._id] = copieCommande[this.props.resto]['carte'][this.props.carte._id] || {};
    let qte = copieCommande[this.props.resto]['carte'][this.props.carte._id]['qte'] || 0;
    let newCommande = {
      'qte': qte + 1,
      'item': this.props.carte
    }
    copieCommande[this.props.resto]['carte'][this.props.carte._id] = newCommande;
    console.log(copieCommande)
    this.setState({
      commande: copieCommande
    });
    this.props.toggleLoading(false);
    this.props.handleClose();
    this.props.enqueueSnackbar("Un(e) \" " + this.props.carte.nom + " \" a été correctement ajouté(e) à la commande",
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
        <DialogTitle id="commande">{this.props.carte.type}
          <Typography>
            Ar {Intl.NumberFormat().format(this.props.carte.prix)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>Voulez vous ajouter un(e) "{this.props.carte.nom}" à la commande ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Annuler
        </Button>
          <Button onClick={this.addCommande.bind(this)} color="primary">
            Ajouter à la commande
        </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
export default withSnackbar(ModalCommandeCarte)