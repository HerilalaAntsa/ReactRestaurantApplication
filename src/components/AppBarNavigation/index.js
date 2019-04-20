import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, Toolbar, AppBar, Grid } from '@material-ui/core';


function AppBarNavigation(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button color="inherit" component={RouterLink} to={ROUTES.LOGIN}>Log in</Button>
            <Button color="inherit" component={RouterLink} to={ROUTES.LOGOUT}>Log out</Button>
            <Button color="inherit" component={RouterLink} to={ROUTES.ACCUEIL}>
              Accueil
            </Button>
            <Button color="inherit" component={RouterLink} to={ROUTES.ACCOUNT}>Account</Button>
            <Button color="inherit" component={RouterLink} to={ROUTES.ADMIN}>Admin</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default AppBarNavigation