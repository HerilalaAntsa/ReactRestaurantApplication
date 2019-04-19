import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailCommandeMenu from './DetailCommandeMenu';
import { app, base } from '../../constants/base';
import DetailCommandeCarte from './DetailCommandeCarte';
import { Slide, Typography } from '@material-ui/core';
import Login from '../Login';
import DetailCommandeRestaurant from './DetailCommandeRestaurant';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 500;

const styles = theme => ({
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
    }
    this.total = 0;
    this.totalCarte = 0;
    this.totalMenu = 0;
  }
  setTotalCarte(value) {
    this.totalCarte = value
  }
  setTotalMenu(value) {
    this.totalMenu = value
  }

  getTotal() {
    return this.totalCarte + this.totalMenu;
  }
  handleClickOpenLogin() {
    this.setState({ openLogin: true });
  }
  handleCloseLogin() {
    this.setState({ openLogin: false });
  }
  removeCommandeCarte(resto, commande, date) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[resto]['carte'][commande.item._id] = null;
    this.setState({
      commande: copieCommande
    })
  }
  removeCommandeMenu(resto, commande, combinaison, date) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    copieCommande[date[resto]]['menu'][commande.item._id][combinaison] = null;
    this.setState({
      commande: copieCommande
    })
  }
  addCommandeCarte(resto, commande, qte, date) {
    const copieCommande = { ...this.state.commande }; // spread operator permert de cloner des object
    console.log(copieCommande)
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

  componentWillMount() {
    console.log("Will mount");
    let date = new Date().toISOString().slice(0, 10);
    // this runs right before the <App> is rendered
    this.ref = base.syncState("restaurant", {
      context: this,
      state: 'restaurant'
    });
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
        base.removeBinding(this.ref);
      }
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    if (this.ref) {
      base.removeBinding(this.ref);
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    let restoDetail = {};
    let userCommande = Object.keys(this.state.commande).map((idresto) => {
      if (this.state.restaurant) {
        restoDetail = this.state.restaurant[idresto];
      }
      let commande = this.state.commande[idresto];
      return <DetailCommandeRestaurant
        key={idresto}
        _id={idresto}
        nomResto={restoDetail["nom"]}
        item={commande}
        addCommandeCarte={this.addCommandeCarte}
        addCommandeMenu={this.addCommandeMenu}
        removeCommandeMenu={this.removeCommandeMenu}
        removeCommandeCarte={this.removeCommandeCarte}
        caller={this}
        getTotal={this.getTotal.bind(this)}
        setTotalCarte={this.setTotalCarte.bind(this)}
        setTotalMenu={this.setTotalMenu.bind(this)}
        totalCarte={this.totalCarte}
        totalMenu={this.totalMenu}
      />
    });
    return (
      <div className="App">
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <h3>Liste de vos commandes aujourd'hui</h3>
        </div>
        <Divider />
        <div>
          {userCommande}
        </div>


          <Grid container spacing={24}>
            <Grid item xs={3}></Grid>        
            {userCommande.length!=0
              ? <Grid item xs={9}>
                  {this.props.authentificated
                    ? <Button disabled={userCommande.length === 0} size="small" onClick={() => this.handleClickSendCommande(this.props.item)}>
                      Confirmez vos commandes
                    </Button>
                    : <Button disabled={userCommande.length === 0} size="small" onClick={() => this.handleClickOpenLogin()}>
                      Confirmez vos commandes
                      </Button>
                  }
                </Grid>
              : <Grid item xs={9}>
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