import React from 'react';
import { Toolbar, IconButton, Typography, Divider, List, ListItem, withStyles, Grid, Paper, Chip, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Plat from './Plat';
import Dialog from '@material-ui/core/Dialog';
import background from '../../img/preview.jpg';

const styles = theme => ({
  root: {
    backgroundSize: 'cover',
    backgroundImage: 'url(' + background + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundAttachment: 'fixed'
  },
  titre: {
    fontFamily: 'Allura',
    color: '#fff',
  },
  button: {
    color: '#ffffff',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    background: 'rgba(255,255,255,.2)',
  }
});

function ModalDetail(props) {
  const { classes } = props;
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={props.Transition}>
      <div
        className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center" spacing={16} justify="space-between">
            <Grid item>
              <IconButton onClick={props.handleClose} aria-label="Close" className={classes.button}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h3" className={classes.titre}
                    style={{textTransform: 'lowercase'}}>
                {props.menu.nom}
                <Divider variant="middle" />
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={
                  <Typography color='primary'>
                    {Intl.NumberFormat().format(props.menu.prix)}
                  </Typography>
                }
                color='primary'
                avatar={<Avatar>Ar</Avatar>}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Toolbar>
        <List>
          <ListItem>
            <Grid container direction="row" wrap="nowrap" spacing={24} alignItems="stretch">
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.titre}
                    variant="h4"
                    align="center"
                    gutterBottom>
                    Hors d 'oeuvre
                </Typography>
                  <Plat list={props.menu.horsdoeuvre} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.titre}
                    variant="h4"
                    align="center"
                    gutterBottom>
                    Plat
                </Typography>
                  <Plat list={props.menu.plat} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.titre}
                    variant="h4"
                    align="center"
                    gutterBottom>
                    Dessert
                </Typography>
                  <Plat list={props.menu.dessert} />
                </Paper>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </div>
    </Dialog>)
}
export default withStyles(styles)(ModalDetail)