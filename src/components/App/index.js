import React, { Component } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Admin from '../Admin';
import * as ROUTES from '../../constants/routes';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@material-ui/core';
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
    }
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider className="App" maxSnack={3}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path={ROUTES.ADMIN} component={Admin} />
              <Route component={Utilisateur} />
            </Switch>
          </Router>
      </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App
