import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Badge, IconButton, Chip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
    const { classes } = props;
    return (
        <div index={props.index}>
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Badge badgeContent={props.commande.qte} color="secondary">
                            <Typography  variant="title">
                                {props.commande.item.nom}
                            </Typography><br />
                        </Badge>
                            <Typography variant="subtitle1" color="textSecondary">
                            <Chip label={props.commande.item.type} /> - Ar {Intl.NumberFormat().format(props.commande.item.prix)}
                            </Typography>
                            
                    <div className={classes.controls}>
                        <Typography>total Ar {Intl.NumberFormat().format(props.total)}</Typography>
                         
                        <IconButton onClick={props.addCommande} color="primary" aria-label="Rajouter">
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <IconButton onClick={props.substractCommande} color="primary" aria-label="Retirer">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <IconButton onClick={props.removeCommande} aria-label="Delete" color="secondary">
                            <DeleteOutlineIcon />
                        </IconButton>
                    </div>
                    </CardContent>
                    
                </div>
            </Card>
        </div>
    )
}

DetailCommandeCarte.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailCommandeCarte);