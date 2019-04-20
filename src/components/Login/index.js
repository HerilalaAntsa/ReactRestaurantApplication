import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { app } from '../../constants/base';
import { DialogContent, DialogActions, Button, Dialog, Typography, Paper, InputLabel, Input } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withSnackbar } from 'notistack';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: false,
      emailInput: '',
      passwordInput: ''
    }
  }
  _handleEmailChange(event) {
    this.setState({
      emailInput: event.target.value
    });
  }
  _handlePasswordChange(event) {
    this.setState({
      passwordInput: event.target.value
    });
  }
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  signUpWithEmailPassword() {
    const email = this.state.emailInput;
    const password = this.state.passwordInput;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // creation utilisateur
          this.props.handleClose();
          this.toggleLoading(true);
          app.auth().createUserWithEmailAndPassword(email, password);

          this.props.enqueueSnackbar("Nouvel utilisateur créé",
            {
              variant: 'default',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            });
          this.toggleLoading(false);
        } else if (providers.indexOf("password") === -1) {
          // facebook par exemple
          this.LoginForm.reset();
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
        this.props.enqueueSnackbar(error.message,
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
      })
  }

  signInWithEmailPassword() {
    const email = this.state.emailInput;
    const password = this.state.passwordInput;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {

        } else if (providers.indexOf("password") === -1) {
          // facebook par exemple
          this.LoginForm.reset();
        } else {
          // Login
          this.props.handleClose();
          this.toggleLoading(true);
          app.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            this.props.enqueueSnackbar("Connexion avec succès",
              {
                variant: 'default',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
              });
            this.toggleLoading(false);
          }).catch((error) => {
            this.props.enqueueSnackbar("Error: " + error.message,
              {
                variant: 'default',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
              });
              this.toggleLoading(false);
          })
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
        this.props.enqueueSnackbar("Error: " + error.message,
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
      })
  }

  authAnonymousToPermanent() {
    const email = this.state.emailInput;
    const password = this.state.passwordInput;

    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    console.log(app.auth().currentUser)
    app.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
      var user = usercred.user;
      this.props.handleClose();
      this.toggleLoading(true);
      console.log("Anonymous account successfully upgraded", user);
      this.props.enqueueSnackbar("Connexion avec succès",
        {
          variant: 'default',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      this.setState({
        redirect: true
      })
      this.toggleLoading(false);
    }, function (error) {
      console.log("Error upgrading anonymous account", error);
      this.props.enqueueSnackbar("Vous êtes déjà connecté",
        {
          variant: 'default',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
    });
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Dialog
              open={this.props.open}
              onClose={this.props.handleClose}
              TransitionComponent={this.props.Transition}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent className={classes.dialogContent}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Veuillez vous connecter
                </Typography>
                <div>
                  <form className={classes.form}
                    onSubmit={(event) => { this.authWithEmailPassword(event) }}
                    ref={(form) => { this.LoginForm = form }}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Adresse Email</InputLabel>
                      <Input autoComplete="email" name="email" type="email"
                        value={this.state.emailInput}
                        onChange={this._handleEmailChange.bind(this)}
                        placeholder="Email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Mot de passe</InputLabel>
                      <Input name="password" type="password"
                        value={this.state.passwordInput}
                        onChange={this._handlePasswordChange.bind(this)}
                        placeholder="Mot de passe" autoComplete="current-password" />
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Se souvenir de moi"
                    />
                  </form>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose}
                  color="primary"
                  fullWidth
                  variant="contained"
                  className={classes.submit}>
                  Annuler
        </Button>
                <Button disabled={this.state.redirect}
                  onClick={this.signUpWithEmailPassword.bind(this)}
                  color="primary"
                  fullWidth
                  variant="contained"
                  className={classes.submit}>
                  S'inscrire
        </Button>

                {app.auth().currentUser
                  ? <Button disabled={this.state.redirect}
                    onClick={this.authAnonymousToPermanent.bind(this)}
                    color="primary"
                    fullWidth
                    variant="contained"
                    className={classes.submit}>
                    Se connecter
           </Button>
                  : <Button disabled={this.state.redirect}
                    onClick={this.signInWithEmailPassword.bind(this)}
                    color="primary"
                    fullWidth
                    variant="contained"
                    className={classes.submit}>
                    Se connecter
          </Button>
                }

              </DialogActions>
            </Dialog>

            <Dialog open={this.state.loading} onClose={() => { }} aria-labelledby="Chargement...">
              <DialogContent>
                <CircularProgress size={68} />
              </DialogContent>
            </Dialog>
          </Paper>
        </main>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withSnackbar(Login));