import React from 'react';
import { Typography, Badge, IconButton, Tooltip, ListItem, Grid, ListItemSecondaryAction, ListItemText, List } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function DetailCommandeMenu(props) {
    const { classes } = props;
    return (
        <ListItem divider>
            <Grid container direction="column">
                <Grid item>
                    <ListItemText primary={
                        <span>({props.commande.qte}) {props.commande.item.nom}</span>
                    } secondary={
                        <span>
                            Ar {Intl.NumberFormat().format(props.commande.item.prix)}
                            <Typography variant="body1" component="span">total Ar {Intl.NumberFormat().format(props.total)}</Typography>
                        </span>
                    }/>
                </Grid>
                <Grid item>
                    <List dense>
                        <ListItem>
                            <ListItemText 
                                secondary={
                                <span>
                                    Hors d'oeuvre : {props.commande.item.horsdoeuvre[props.commande.horsdoeuvre].nom}
                                </span>}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                secondary={
                                <span>
                                    Plat : {props.commande.item.plat[props.commande.plat].nom}
                                </span>}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                secondary={
                                <span>
                                    Dessert : {props.commande.item.dessert[props.commande.dessert].nom}
                                </span>}
                            />                            
                        </ListItem>
                    </List>
                </Grid>
                <Grid item>
                    <Grid container direction='row'>
                        <Grid item>
                            <Tooltip title="Ajouter la quantité">
                                <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Réduire la quantité">
                                <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Retirer">
                                <IconButton onClick={props.removeCommande} aria-label="Delete" color="secondary">
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
        </ListItem>
    )
}
export default DetailCommandeMenu