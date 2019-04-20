import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography, FormControl, InputLabel, Input, InputAdornment, withStyles } from '@material-ui/core';
import StepperNew from './StepperNew';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';
const uuidv4 = require('uuid/v4');

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
      nom: '',
      prix: 0,
      horsdoeuvre: [],
      plat:[],
      dessert:[],
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
  handleChange(event) {
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
    this.saveNew();
  }
  saveNew() {
    this.props.toggleLoading(true);
    let uuid = uuidv4();
    const copieMenu = { ...this.state.menu }; // spread operator permert de cloner des object
    let horsdoeuvre = {};
    this.state.horsdoeuvre.map((value) => {
      horsdoeuvre[value._id] = value;
      return null;
    })
    let plat = {};
    this.state.plat.map((value) => {
      plat[value._id] = value;
      return null;
    })
    let dessert = {};
    this.state.dessert.map((value) => {
      dessert[value._id] = value;
      return null;
    })
    copieMenu[uuid] = {
      '_id': uuid,
      'nom': this.state.nom,
      'horsdoeuvre': horsdoeuvre,
      'plat': plat,
      'dessert': dessert,
      'prix': this.state.prix
    }
    this.setState({
      menu: copieMenu,
      horsdoeuvre: undefined,
      plat: undefined,
      dessert: undefined,
      prix: 0,
      nom: '',
    });
    this.props.toggleLoading(false);
    this.props.handleClose();
    this.props.enqueueSnackbar("Le menu \" " + copieMenu[uuid]['nom'] + " \" a été correctement ajouté",
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
    const { classes } = this.props;
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
      return null;
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
          <Typography variant="h5" component="span">
            Ajouter un nouveau menu
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth className={classes.margin} margin="normal" required>
            <InputLabel htmlFor="nom">Nom</InputLabel>
            <Input name="nom"
              value={this.state.nom}
              onChange={this.handleChange.bind(this)}
              placeholder="Nom" autoFocus />
          </FormControl>
          <FormControl fullWidth className={classes.margin} margin="normal" required>
            <InputLabel htmlFor="prix">Prix</InputLabel>
            <Input name="prix"
              value={this.state.prix}
              onChange={this.handleChange.bind(this)}
              endAdornment={<InputAdornment position="end">Ariary</InputAdornment>}
              placeholder="Prix" />
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