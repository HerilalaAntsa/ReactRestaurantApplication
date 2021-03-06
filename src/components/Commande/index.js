import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { app, base } from '../../constants/base';
import { Slide } from '@material-ui/core';
import Login from '../Login';
import DetailCommandeRestaurant from './DetailCommandeRestaurant';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 500;

const styles = theme => ({
  titre: {
    fontFamily: 'Allura',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
});

class Commande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commande: {},
      openLogin: false,
      authentificated: false,
      user: {},
      total: 0,
    }
    this.total = 0;
  }

  addTotal(value) {
    this.total += value;
  }
  handleClickOpenLogin() {
    this.setState({ openLogin: true });
  }
  handleCloseLogin() {
    this.setState({ openLogin: false });
  }
  removeCommandeCarte(resto, commande) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['carte'][commande.item._id] = null;
    if (Object.keys(copieCommande[resto]['carte']).length === 1 && !copieCommande[resto]['menu']) {
      copieCommande[resto] = null;
    }
    this.setState({
      commande: copieCommande
    })
  }
  removeCommandeMenu(resto, commande, combinaison) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['menu'][commande.item._id][combinaison] = null;
    let menuEmpty = Object.keys(copieCommande[resto]['menu']).length === 1 && Object.keys(copieCommande[resto]['menu'][commande.item._id]).length === 1;
    if (!copieCommande[resto]['carte'] && menuEmpty) {
      copieCommande[resto] = null;
    }
    this.setState({
      commande: copieCommande
    })
  }
  addCommandeCarte(resto, commande, qte, date) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['carte'][commande.item._id]['qte'] += qte;
    if (copieCommande[resto]['carte'][commande.item._id]['qte'] <= 0) {
      return this.removeCommandeCarte(resto, commande, date);
    }
    this.setState({
      commande: copieCommande
    })
  }

  addCommandeMenu(resto, commande, combinaison, qte, date) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['menu'][commande.item._id][combinaison]['qte'] += qte;
    if (copieCommande[resto]['menu'][commande.item._id][combinaison]['qte'] <= 0) {
      return this.removeCommandeMenu(resto, commande, combinaison, date);
    } else
      this.setState({
        commande: copieCommande
      })
  }

  handleClickSendCommande(date, resto) {
    const copieCommande = { ...this.state.commande };
    copieCommande[resto]["isConfirmed"] = true;
  }

  bindCommande() {
    let date = new Date().toISOString().slice(0, 10);
    app.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.isAnonymous) {
          this.setState({ authentificated: false, user: user });
        } else {
          this.setState({ authentificated: true, user: user });
        }
        this.ref = base.syncState("commande/" + user.uid + "/" + date, {
          context: this,
          state: 'commande'
        });
      } else {
        this.setState({ authentificated: false, user: {} });
      }
    });
  }

  componentWillMount() {
    console.log("Will mount");
    // this runs right before the <App> is rendered
    this.refResto = base.bindToState("restaurant", {
      context: this,
      state: 'restaurant',
      then: this.bindCommande.bind(this)
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    if (this.ref) {
      base.removeBinding(this.ref);
    }
    base.removeBinding(this.refResto)
  }

  render() {
    const { classes, theme } = this.props;
    let userCommande = Object.keys(this.state.commande).map((idresto) => {
      let commande = this.state.commande[idresto];
      return <DetailCommandeRestaurant
        key={idresto}
        _id={idresto}
        nomResto={this.state.restaurant[idresto]["nom"]}
        item={commande}
        addCommandeCarte={this.addCommandeCarte}
        addCommandeMenu={this.addCommandeMenu}
        removeCommandeMenu={this.removeCommandeMenu}
        removeCommandeCarte={this.removeCommandeCarte}
        caller={this}
        addTotal={this.addTotal.bind(this)}
      />
    });
    return (
      <div className="App">
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography align="center" className={classes.titre} variant="h3">Liste de vos commandes du jour</Typography>
        </div>
        <Divider/>
        <div>
          {userCommande}
        </div>

        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={4}></Grid>
          {userCommande.length !== 0
            ? <Grid item xs={8}>
              {this.props.authentificated
                ? <Typography>Vos commandes sont désormais considérées.</Typography>
                : <div>
                  <Button color="primary" disabled={userCommande.length === 0} size="small" onClick={() => this.handleClickOpenLogin()}>
                    Se connecter
                      </Button>
                  <Typography variant="caption">Pour que vos commandes soient considérées, veuillez vous connecter</Typography>
                </div>
              }
            </Grid>
            : <Grid item xs={8}>
              <Typography>Aucune commande n'a encore été faite</Typography>
            </Grid>
          }
        </Grid>

        <Login
          handleClose={this.handleCloseLogin.bind(this)}
          open={this.state.openLogin}
          Transition={Transition}
        />
      </div>
    )
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
Commande.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Commande);