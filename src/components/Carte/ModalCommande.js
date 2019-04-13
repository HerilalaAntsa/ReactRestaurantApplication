import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import StepperCommande from './StepperCommande';

function ModalCommande(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={props.Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Commander "{props.carte.nom}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ar {Intl.NumberFormat().format(props.carte.prix)}
        </DialogContentText>
        <StepperCommande />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ModalCommande