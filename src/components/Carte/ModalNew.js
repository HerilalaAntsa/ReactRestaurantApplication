import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography, InputLabel, FormControl, MenuItem, Select, withStyles, Input, InputAdornment } from '@material-ui/core';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';
const uuidv4 = require('uuid/v4');

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
});

class ModalNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: {},
      user: {},
      nom: {},
      description: "",
      prix: "",
      photo: "",
      type: "",
    }
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.ref = base.syncState("carte", {
          context: this,
          state: 'carte'
        })
        this.setState({
          user: user,
        })
      } else {
        this.setState({ user: {} });
        if (this.ref) {
          base.removeBinding(this.ref);
        }
      }
    });
  }
  componentWillUnmount() {
    console.log("Will unmount");
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }
  addCarte() {
    var user = app.auth().currentUser;
    if (user) {
      this.saveCarte();
    } 
  }

  saveCarte() {
    this.props.toggleLoading(true);
    let uuid = uuidv4();
    const copieCarte = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCarte[this.props.resto] = copieCarte[this.props.resto] || {};
    copieCarte[this.props.resto][uuid] = copieCarte[this.props.resto][uuid] || {};
    let newCarte = {
      '_id': uuid,
      'description': this.state.description,
      'nom': this.state.nom,
      'photo': this.state.photo || "https://firebasestorage.googleapis.com/v0/b/exo-restaurant.appspot.com/o/default-thumbnail.jpg?alt=media&token=9c55ab62-39a5-4c7d-93d3-a96f26b8cf7e",
      'prix': this.state.prix,
      'type': this.state.type,
    }
    console.log(copieCarte)
    copieCarte[this.props.resto][uuid]  = newCarte;
    this.setState({
      carte: copieCarte
    });
    this.props.toggleLoading(false);
    this.props.handleClose();
    this.props.enqueueSnackbar("Un(e) \" " + this.state.nom + " \" a été correctement ajouté(e)",
      {
        variant: 'default',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
  }

  render() {
    const {classes} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={this.props.Transition}
        aria-labelledby="commande"
        scroll="body"
      >
        <DialogTitle id="commande">
          <Typography variant="h5" component="span">
            Ajouter un nouveau plat à la carte
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="nom">Nom</InputLabel>
              <Input name="nom"
                value={this.state.nom}
                onChange={this.handleChange.bind(this)}
                placeholder="Nom" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input name="description"
                value={this.state.description}
                multiline
                rows={4}
                onChange={this.handleChange.bind(this)}
                placeholder="Description" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="prix">Prix</InputLabel>
              <Input name="prix"
                value={this.state.prix}
                onChange={this.handleChange.bind(this)}
                endAdornment={<InputAdornment position="end">Ariary</InputAdornment>}
                placeholder="Prix" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="photo">Photo</InputLabel>
              <Input name="photo"
                type="file"
                accept="image/*"                
                value={this.state.photo}
                onChange={this.handleChange.bind(this)}
                inputProps={{
                  'aria-label': 'Importer une image du plat',
                }}
                placeholder="Photo" />
            </FormControl>            
            <FormControl required fullWidth>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.handleChange.bind(this)}
                inputProps={{
                  name: 'type',
                }}
              >
                <MenuItem value="">
                  <em>Autre</em>
                </MenuItem>
                <MenuItem value="Hors d'oeuvre">Hors d'oeuvre</MenuItem>
                <MenuItem value="Plat">Plat</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Annuler
        </Button>
          <Button color="primary" onClick={this.addCarte.bind(this)}>
            Ajouter à la carte
        </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
export default withStyles(styles)(withSnackbar(ModalNew))