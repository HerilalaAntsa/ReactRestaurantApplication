import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton, Chip, Tooltip, Grid, ListItem, ListItemText } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function DetailCommandeCarte(props) {
    return (
    <ListItem divider>
        <Grid container>
            <Grid item>
                <ListItemText primary={<span>
                        ({props.commande.qte}) {props.commande.item.nom}
                        <Chip label={props.commande.item.type} />
                    </span>}
                        secondary={<span>
                            Ar {Intl.NumberFormat().format(props.commande.item.prix)}
                            <Typography variant="body1" component="span">total Ar {Intl.NumberFormat().format(props.total)}</Typography>
                        </span>} />
            </Grid>
            <Grid item>
                <Grid container direction='row'>
                    <Grid item>
                        <Tooltip title={"Ajouter la quantité de " + props.commande.item.nom}>
                            <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title={"Réduire la quantité de " + props.commande.item.nom}>
                            <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Retirer ">
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

DetailCommandeCarte.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailCommandeCarte);