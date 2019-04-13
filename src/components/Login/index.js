import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { app, base } from '../../constants/base';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';

class Login extends Component {
  constructor(props) {
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
    }
  }

  authWithEmailPassword() {
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        console.log(providers);
        if (providers.length === 0) {
          // creation utilisateur
          app.auth().createUserWithEmailAndPassword(email, password);

          this.props.enqueueSnackbar("Nouvel utilisateur créé",
            {
              variant: 'default',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            });
            this.props.handleClose();
        } else if (providers.indexOf("password") === -1) {
          // facebook par exemple
          this.LoginForm.reset();
        } else {
          // Login
          app.auth().signInWithEmailAndPassword(email, password);

          this.props.enqueueSnackbar("Connexion avec succès",
            {
              variant: 'default',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            });
            this.props.handleClose();
        }

      })
      .then((user) => {
        if (user && user.email) {
          this.LoginForm.reset();
          this.setState({ redirect: true })

          this.props.enqueueSnackbar("Vous êtes déjà connecté",
            {
              variant: 'default',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(error,
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (

      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={this.props.Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Veuillez vous connecter
        </DialogTitle>
        <DialogContent>
          <div>
            <form onSubmit={(event) => { this.authWithEmailPassword(event) }}
              ref={(form) => { this.LoginForm = form }}>
              <label>
                Email
            <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
              </label>
              <label>
                Mot de passe
            <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Mot de passe"></input>
              </label>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Annuler
        </Button>
          <Button disabled={this.state.redirect} onClick={this.authWithEmailPassword.bind(this)} color="primary">
            Connexion
        </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withSnackbar(Login);