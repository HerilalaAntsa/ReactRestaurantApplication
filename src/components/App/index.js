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
import { Drawer, CssBaseline, withStyles, IconButton, Divider, Fab, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';
import 'typeface-allura';

const drawerWidth = 400;
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#b2fab4',
      main: '#81c784',
      dark: '#519657',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8b6b61',
      main: '#5d4037',
      dark: '#321911',
      contrastText: '#fff',
    },
  },
});
const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
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
    backgroundColor: theme.palette.background.default,
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
    };
  }
  handleDrawerOpen() {
    this.setState({ openCommande: true });
  };

  handleDrawerClose() {
    this.setState({ openCommande: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider className="App" maxSnack={3}>
        <div className={classes.root}>
          <CssBaseline />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: this.state.openCommande,
            })}>
            <Router>
              <div>
                <Navigation />

                <hr />

                <Route path={[ROUTES.ACCUEIL, '/']} exact component={RestaurantList} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.LOGOUT} component={Logout} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
                <Route path={ROUTES.RESTAURANT + '/:id'} component={Restaurant} />
                <Route path={ROUTES.MENURESTAURANT + '/:id'} component={MenuList} />
                <Route path={ROUTES.CARTERESTAURANT + '/:id'} component={CarteList} />
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
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose.bind(this)}>
                {<ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <Commande />
          </Drawer>
        </div>
          <Fab onClick={this.handleDrawerOpen.bind(this)} color="secondary" aria-label="Add" className={classes.fab}>
            <ShoppingCartOutlinedIcon />
          </Fab>
      </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(styles, { withTheme: true })(App);