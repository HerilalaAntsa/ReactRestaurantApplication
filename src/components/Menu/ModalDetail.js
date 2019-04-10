import React from 'react';
import { Toolbar, IconButton, Typography, Divider, List, ListItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Plat from './Plat';
import Dialog from '@material-ui/core/Dialog';

function ModalDetail(props){
    return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={props.Transition}>
      <Toolbar>
        <IconButton color="inherit" onClick={props.handleClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className="flex">
          {props.menu.nom}
        </Typography>
        <Typography variant="subtitle1" color="inherit" className="flex">
          {props.menu.prix}
        </Typography>
      </Toolbar>
      <List>
        <ListItem primary="Hors d'oeuvre">
          <Plat list={props.menu.horsdoeuvre} />
        </ListItem>
        <Divider />
        <ListItem primary="Plat">
          <Plat list={props.menu.plat} />
        </ListItem>
        <Divider />
        <ListItem primary="Dessert">
          <Plat list={props.menu.dessert} />
        </ListItem>
      </List>
    </Dialog>)
}
export default ModalDetail