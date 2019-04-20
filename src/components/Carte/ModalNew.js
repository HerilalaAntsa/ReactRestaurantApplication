import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography, InputLabel, FormControl, MenuItem, Select, withStyles, Input, InputAdornment } from '@material-ui/core';
import { app, base } from '../../constants/base';
import { withSnackbar } from 'notistack';

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
    }
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };
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
          <Typography variant="h5">
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
          <Button color="primary">
            Ajouter à la carte
        </Button>
        </DialogActions>
      </Dialog>
    )
  }

}
export default withStyles(styles)(withSnackbar(ModalNew))