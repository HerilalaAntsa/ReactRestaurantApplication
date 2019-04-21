import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, Toolbar, AppBar, Grid, Typography } from '@material-ui/core';
import { app } from '../../constants/base';


function AppBarNavigation(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {props.authentified ?
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h5" style={{ color: '#fff', right: 0 }} >Bienvenue {props.user.displayName} !</Typography>
            </Grid>
            : null
          }
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {props.authentified ?
              <Button color="inherit" component={Link} to={ROUTES.LOGOUT}>Déconnexion</Button>
              : <Button onClick={() => { props.openLogin() }} color="inherit">Connexion</Button>
            }


            <Button color="inherit" component={Link} to={ROUTES.ACCUEIL}>
              Accueil
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default AppBarNavigation