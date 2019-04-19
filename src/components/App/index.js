import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Admin from '../Admin';
import * as ROUTES from '../../constants/routes';
import { SnackbarProvider } from 'notistack';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import 'typeface-allura';
import { blueGrey } from '@material-ui/core/colors';
import Utilisateur from '../Utilisateur';

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
      authentificated: false
    }
  }
  handleDrawerOpen() {
    this.setState({ openCommande: true });
  };

  handleDrawerClose() {
    this.setState({ openCommande: false });
  };
  
  handleClickOpenLogin() {
    this.setState({ openLogin: true});
  }
  handleClickCloseLogin() {
    this.setState({ openLogin: false});
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider className="App" maxSnack={3}>
            <Router>
                <Route path={'/'} component={Utilisateur} />
                <Route path={ROUTES.ADMIN} exact component={Admin} />
            </Router>
      </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}
export default App;
