import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import classNames from 'classnames';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import Commande from '../Commande';
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
import { Slide } from '@material-ui/core';
import Admin from '../Admin';
import * as ROUTES from '../../constants/routes';
import { SnackbarProvider } from 'notistack';
import { Drawer, CssBaseline, withStyles } from '@material-ui/core';
import { app, base } from '../../constants/base';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import 'typeface-allura';
import { blueGrey } from '@material-ui/core/colors';
import Utilisateur from '../Utilisateur';

const drawerWidth = 500;

const secondary = {
      light: '#626262',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    };
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  toolbar: theme.mixins.toolbar,
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
  palette: {
    primary: blueGrey,
    secondary: secondary
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCommande: true,
      openLogin: false,
      authentificated: false,
      openDrawer: false,
    }
  }
  handleDrawerOpen = () => {
    this.setState({ openDrawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ openDrawer: false });
  };

  handleClickOpenLogin() {
    this.setState({ openLogin: true });
  }
  handleClickCloseLogin() {
    this.setState({ openLogin: false });
  }

  render() {
    const { classes, theme } = this.props;
    const { openDrawer } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider className="App" maxSnack={3}>
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, openDrawer && classes.hide)}
          >
            <ShoppingCartIcon />
          </IconButton>
            <Router>
              <div>
                <Navigation />

                <hr />

                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.LOGIN} component={() => <Login
                  handleClose={this.handleClickCloseLogin.bind(this)}
                  open={true}
                  Transition={Transition}
                />}
                />
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
            variant="persistent"
            anchor="right"
            open={openDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <Commande
            handleDrawerClose={this.handleDrawerClose.bind(this)}
            open={this.state.openDrawer}
            Transition={Transition}
          />

          </Drawer>
        </div>
            <Router>
                <Route path={'/'} component={Utilisateur} />
                <Route path={ROUTES.ADMIN} exact component={Admin} />
            </Router>
      </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default withStyles(theme, { withTheme: true })(App);
