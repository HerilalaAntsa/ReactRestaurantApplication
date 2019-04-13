import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import RestaurantList from '../RestaurantList';
import Restaurant from '../Restaurant';
import MenuList from '../Menu';

import * as ROUTES from '../../constants/routes';
import Commande from '../Commande';
import { SnackbarProvider } from 'notistack';
import { Drawer } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <SnackbarProvider className="App" maxSnack={3}>
        <Drawer
          variant="permanent"
          anchor="right"
        >
          <Commande />
        </Drawer>
        <Router>
          <div>
            <Navigation />

            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ACCUEIL} component={RestaurantList} />
            <Route path={ROUTES.RESTAURANT + '/:id'} component={Restaurant} />
            <Route path={ROUTES.MENURESTAURANT + '/:id'} component={MenuList} />
          </div>
        </Router>
      </SnackbarProvider>
    );
  }
}

export default App;