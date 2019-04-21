import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, Toolbar, AppBar, Grid, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';

function AppBarNavigation(props) {
  return (
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {props.authentified ?
            <Typography align="right" variant="button" style={{ color: '#fff', right: 0 }} >
              <FaceIcon style={{marginRight : 8}}/>
              Bienvenue {props.user.displayName} !
            </Typography>
            : null
            }
            <Grid item>
              {props.authentified ?
                  <Button color="inherit" component={Link} to={ROUTES.LOGOUT}>
                    Déconnexion
                  </Button>
                : <Button onClick={() => { props.openLogin() }} color="inherit">
                    Connexion
                  </Button>
              }
              <Button color="inherit" component={Link} to={ROUTES.ACCUEIL}>
                <HomeIcon style={{marginRight:8}}/>
                Accueil
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}
export default AppBarNavigation