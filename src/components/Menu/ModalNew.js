import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography, FormControl, InputLabel, Input, InputAdornment, withStyles } from '@material-ui/core';
import StepperNew from './StepperNew';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});
class ModalNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      menu: {},
      carte: {},
    }
  }
  componentWillMount() {
    this.refCarte = base.syncState("carte/" + this.props.resto, {
      context: this,
      state: 'carte'
    })
    this.ref = base.syncState("menu/" + this.props.resto, {
      context: this,
      state: 'menu'
    })
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
        })
      } else {
        this.setState({ user: {} });
      }
    });
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
    base.removeBinding(this.refCarte);
  }
  menuComplete() {
    return !(
      (typeof this.state.horsdoeuvre !== 'undefined' && this.state.horsdoeuvre !== null)
      && (typeof this.state.plat !== 'undefined' && this.state.plat !== null)
      && (typeof this.state.dessert !== 'undefined' && this.state.dessert !== null)
    )
  }
  addNew() {
    var user = app.auth().currentUser;
    if (user) {
      this.saveNew();
    } else {
      app.auth().signInAnonymously()
        .then((cred) => {
          //Est appelé avant le listener on authstatechanged
          var dateNow = new Date().toISOString().slice(0, 10);
          this.ref = base.syncState("menu/" + cred.user.uid + '/' + dateNow, {
            context: this,
            state: 'menu',
          })
          this.saveNew();
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
  saveNew() {
    this.props.toggleLoading(true);
    const copieNew = { ...this.state.menu }; // spread operator permert de cloner des object
    copieNew[this.props.resto] = copieNew[this.props.resto] || { 'menu': {}, 'carte': {} };
    copieNew[this.props.resto]['menu'] = copieNew[this.props.resto]['menu'] || {};
    copieNew[this.props.resto]['isConfirmed'] = false;
    copieNew[this.props.resto]['menu'][this.props.menu._id] = copieNew[this.props.resto]['menu'][this.props.menu._id] || {};
    let key = this.state.horsdoeuvre + this.state.plat + this.state.dessert;
    copieNew[this.props.resto]['menu'][this.props.menu._id][key] = copieNew[this.props.resto]['menu'][this.props.menu._id][key] || {};
    let qte = copieNew[this.props.resto]['menu'][this.props.menu._id][key]['qte'] || 0;
    let newNew = {
      'nom': qte + 1,
      'horsdoeuvre': this.state.horsdoeuvre,
      'plat': this.state.plat,
      'dessert': this.state.dessert,
      'prix': this.props.menu
    }
    copieNew[this.props.resto]['menu'][this.props.menu._id][key] = newNew;
    this.setState({
      menu: copieNew,
      horsdoeuvre: undefined,
      plat: undefined,
      dessert: undefined,
    });
    this.props.toggleLoading(false);
    this.props.handleClose();
    this.props.enqueueSnackbar("Le menu \" " + this.props.menu.nom + " \" a été correctement ajouté à la menu",
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
    const {classes} = this.props;
    let tabHorsDoeuvre = [];
    let tabPlat = [];
    let tabDessert = [];
    Object.keys(this.state.carte).map((key) => {
      let item = this.state.carte[key];
      switch (item.type) {
        case "Hors d'oeuvre":
          tabHorsDoeuvre.push(item);
          break;
        case "Plat":
          tabPlat.push(item);
          break;
        case "Dessert":
          tabDessert.push(item);
          break;
        default:
          break;
      }
    });
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        TransitionComponent={this.props.Transition}
        aria-labelledby="menu"
        scroll="body"
      >
        <DialogTitle id="menu">
          <Typography variant="h5">
            Ajouter un nouveau menu
          </Typography>
        </DialogTitle>
        <DialogContent>          
            <FormControl className={classes.margin} margin="normal" required>
              <InputLabel htmlFor="nom">Nom</InputLabel>
              <Input name="nom"
                value={this.state.nom}
                onChange={this.handleChange.bind(this)}
                placeholder="Nom" autoFocus
                margin="normal" />
            </FormControl>
            <FormControl className={classes.margin} margin="normal" required>
              <InputLabel htmlFor="prix">Prix</InputLabel>
              <Input name="prix"
                value={this.state.prix}
                onChange={this.handleChange.bind(this)}
                endAdornment={<InputAdornment position="end">Ariary</InputAdornment>}
                placeholder="Prix"/>
            </FormControl>
          <StepperNew 
            horsdoeuvre={tabHorsDoeuvre}
            plat={tabPlat}
            dessert={tabDessert}
            menuState={this.setState.bind(this)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            Annuler
          </Button>
          <Button disabled={this.menuComplete()} onClick={this.addNew.bind(this)} color="primary">
            Enregistrer le menu
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
export default withStyles(styles)(withSnackbar(ModalNew))