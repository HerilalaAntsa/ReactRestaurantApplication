import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Badge, IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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
    const { classes, theme } = props;
    return (
        <div index={props.index}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image="./static/images/plat.jpg"
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Badge badgeContent={props.commande.qte} color="secondary">
                            <Typography component="h5" variant="h5">
                                {props.commande.item.nom}
                            </Typography><br />
                        </Badge>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.commande.item.type} - Ar {Intl.NumberFormat().format(props.commande.item.prix)}
                            </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Typography>total Ar {Intl.NumberFormat().format(props.totalCarte)}</Typography>
                         
                        <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                            <AddShoppingCartIcon />
                        </IconButton>
                        <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                            <RemoveShoppingCartIcon />
                        </IconButton>
                        <IconButton onClick={props.removeCommande} aria-label="Delete" color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </Card>
        </div>
    )
}

DetailCommandeCarte.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DetailCommandeCarte);