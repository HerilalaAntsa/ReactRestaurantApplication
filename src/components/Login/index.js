import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { app } from '../../constants/base';
import { DialogContent, DialogActions, Button, Dialog, Paper, InputLabel, Input, AppBar, Tabs, Tab, IconButton, InputAdornment } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withSnackbar } from 'notistack';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
      showPassword: false,
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
      value: 0,
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };
  handleChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  toggleLoading(newloading) {
    this.setState({
      loading: newloading,
    });
  }

  signUpWithEmailPassword() {
    const email = this.state.email;
    const password = this.state.password;

    // creation utilisateur
    this.props.handleClose();
    this.toggleLoading(true);
    app.auth().createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        this.props.enqueueSnackbar(
          "Votre compte a été correctement créé avec l'adresse :" + cred.user.email,
          {
            variant: 'default',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        this.toggleLoading(false);
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
        this.toggleLoading(false);
      });
  }

  signInWithEmailPassword() {
    const email = this.state.email;
    const password = this.state.password;

    // Login
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
        this.props.handleClose();
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
  getButton(value) {
    const { classes } = this.props;
    switch (value) {
      case 0:
        return app.auth().currentUser
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
      case 1:
        return <Button disabled={this.state.redirect}
          onClick={this.signUpWithEmailPassword.bind(this)}
          color="primary"
          fullWidth
          variant="contained"
          className={classes.submit}>
          S'inscrire
      </Button>
      default: return null;
    }
  }
  getInput(value) {
    switch (value) {
      case 1: return (
        <div>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirmer votre mot de passe</InputLabel>
            <Input name="confirmPassword" type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChangeInput.bind(this)}
              placeholder="Mot de passe" autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Identifiant</InputLabel>
            <Input autoComplete="username" name="username"
              value={this.state.username}
              onChange={this.handleChangeInput.bind(this)}
              placeholder="Identifiant" autoFocus />
          </FormControl>
        </div>
      )
      default: return null;
    }
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
                <AppBar position="static">
                  <Tabs value={this.state.value} onChange={this.handleChange} variant="fullWidth">
                    <Tab label="Connexion" />
                    <Tab label="Inscription" />
                  </Tabs>
                </AppBar>
                <div>
                  <form className={classes.form}
                    ref={(form) => { this.LoginForm = form }}>

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Adresse Email</InputLabel>
                      <Input autoComplete="email" name="email" type="email"
                        value={this.state.emailInput}
                        onChange={this.handleChangeInput.bind(this)}
                        placeholder="Email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Mot de passe</InputLabel>
                      <Input
                        name="password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChangeInput.bind(this)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword.bind(this)}
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {this.getInput(this.state.value)}
                  </form>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose}
                  color="primary"
                  fullWidth
                  className={classes.submit}>
                  Annuler
                </Button>
                {this.getButton(this.state.value)}

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