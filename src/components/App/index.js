import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import RestaurantList from '../RestaurantList';
import Restaurant from '../Restaurant';
import MenuList from '../Menu';
import CarteList from '../Carte';
import Login from '../Login';
import Logout from '../Logout';

import * as ROUTES from '../../constants/routes';
import Commande from '../Commande';
import { SnackbarProvider } from 'notistack';
import { Drawer, CssBaseline, withStyles } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <SnackbarProvider className="App" maxSnack={3}>
      <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Router>
          <div>
            <Navigation />

            <hr />

            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.LOGOUT} component={Logout} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ACCUEIL} component={RestaurantList} />
            <Route path={ROUTES.RESTAURANT + '/:id'} component={Restaurant} />
            <Route path={ROUTES.MENURESTAURANT + '/:id'} component={MenuList} />
            <Route path={ROUTES.CARTERESTAURANT + '/:id'} component={CarteList} />
          </div>
        </Router>
        </main>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="right"
        >
          <Commande />
        </Drawer>
        </div>
      </SnackbarProvider>
    );
  }
}
export default withStyles(styles)(App);