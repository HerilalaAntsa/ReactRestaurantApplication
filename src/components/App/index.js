import React, { Component } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
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
    let listPlat = ["Avocats à la mayonnaise", "Tomates en salade","Salade russe", "Salade de carottes", "Salade de haricots verts", "Macédoine mayonnaise", "Taboulé", "Achards de légumes","Salade de maïs et thon", "Salade composée", "Salade de gésiers de canard", "Tarte à l\'oignon", "Demi pomélos crevettes", "Assiette de jambon macédoine", "Wrap de saumon fumé crème de ciboulette","Salade feta,tomates,concombres", "Salade frisée fromage blanc et lardons", "Salade de pâtes au jambon","Beignet de calamar", "Assiette d\'endives au fromage","Crêpe forestière", "Quiche Lorraine", "Mousse d\'avocat au saumon fumé", "Cocktail de crevettes", "Feuilleté hot dog", "Assiette de rollmops salade de pommes de terre", "Salade de poulet grillé parmesan", "Salade de riz au thon", "Friand viande", "Salade aux trois fromages", "Salade de crevettes et pamplemousse", "Salade de boulgour à la menthe et tomates", "Tomates au thon", "Salade de pommes de terre au saumon fumé et baies rose", "Bûchette au fromage", "Oeuf à la Russe", "Tartine au fromage de chèvre chaud à l\'ail", "Asperges fraîches", "Brick au thon", "Salade fraîcheur, roquefort, noix et radis", "Salade de coppa", "Raita de betteraves aux cajous", "Terrine de poulet à l\'estragon", "Julienne de légumes"];
    console.log("length ty eee ")
    console.log(listPlat.length)
    return (
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider className="App" maxSnack={3}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route component={Utilisateur} />
            </Switch>
          </Router>
      </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App
