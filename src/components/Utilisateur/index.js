import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AppBarNavigation from '../AppBarNavigation';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import RestaurantList from '../RestaurantList';
import Restaurant from '../Restaurant';
import MenuList from '../Menu';
import CarteList from '../Carte';
import Login from '../Login';
import Logout from '../Logout';

import * as ROUTES from '../../constants/routes';
import Commande from '../Commande';
import { Drawer, withStyles, Divider, Fab, Slide } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import classNames from 'classnames';
import { app } from '../../constants/base';

const drawerWidth = 400;
const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
      position: 'fixed',
      top: theme.spacing.unit ,
      right: theme.spacing.unit ,
    },
    root: {
      display: 'flex',
      position: 'relative',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
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
  
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        openCommande: true,
        openLogin: false,
        authentificated: false,
        user: null,
      };
      app.auth().onAuthStateChanged(user => {
        this.setState({
          authentificated: user && !user.isAnonymous,
          user: user,
        })
      });
    }
    handleDrawerOpen() {
      this.setState({ openCommande: true });
    };
  
    handleDrawerClose() {
      this.setState({ openCommande: false });
    };
    handleClickOpenLogin() {
      this.setState({ openLogin: true });
    }
    handleClickCloseLogin() {
      this.setState({ openLogin: false });
    }
  
    render() {
      const { classes } = this.props;
      return (
        <div className="Utilisateur">
          <div className={classes.root}>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: this.state.openCommande,
              })}>
              <Router>
                <div>
                  <AppBarNavigation 
                    authentified={this.state.authentificated} 
                    openLogin={this.handleClickOpenLogin.bind(this)} 
                    user={this.state.user}/>
  
                  <hr />
  
                  <Route path={[ROUTES.ACCUEIL, '/']} exact component={RestaurantList} />
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.LOGOUT} component={Logout} />
                  <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                  <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                  <Route path={ROUTES.RESTAURANT + '/:id'} component={Restaurant} />
                  <Route path={ROUTES.MENURESTAURANT + '/:id'} component={MenuList} />
                  <Route path={ROUTES.CARTERESTAURANT + '/:id'} component={CarteList} />
                  <Route path={ROUTES.RESTAURANT + '/:id' + ROUTES.MENURESTAURANT} component={MenuList} />
                  <Route path={ROUTES.RESTAURANT + '/:id' + ROUTES.CARTERESTAURANT} component={CarteList} />
                </div>
              </Router>
            </main>
  
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={this.state.openCommande}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Divider />
              <Commande
                handleDrawerClose={this.handleDrawerClose.bind(this)}
                authentificated={this.state.authentificated}/>
            </Drawer>
          </div>
            <Fab onClick={this.handleDrawerOpen.bind(this)} color="secondary" aria-label="Add" className={classes.fab}>
              <ShoppingCartOutlinedIcon />
            </Fab>
            <Login
                    handleClose={this.handleClickCloseLogin.bind(this)}
                    open={this.state.openLogin}
                    Transition={Transition}
                  />
        </div>
      );
    }
  }
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  export default withStyles(styles)(App);