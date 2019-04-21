import React from 'react';
import { Button, ListItem, Avatar, ListItemText, withStyles, Chip, Grid, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { app } from '../../constants/base';

const styles = theme => ({
    titre: {
        fontFamily: 'Allura'
    },
    button: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});
    
function CarteListItem(props) {
    const { classes } = props;
    var storageRef = app.storage().ref();
    var imgref = storageRef.child(props.item.photo);
    return (
        <ListItem key={props.item._id} alignItems="flex-start" divider>
            <Grid container spacing={8} wrap="nowrap" alignItems="center">
                <Grid item>
                    <img width={150} alt={props.item.nom} src={props.item.photo} />
                </Grid>
                <Grid item container direction="column">
                    <Grid item>
                        <ListItemText secondary={props.item.description}>
                            <Typography style={{ marginRight: 20 }} inline>{props.item.nom}</Typography>
                            <Chip label={props.item.type} />
                        </ListItemText>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} variant="contained" color="primary" onClick={() => props.handleClickOpenCommande(props.item)}>
                            <AddShoppingCartIcon className={classes.leftIcon} />
                            Commander ce plat
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Chip
                        label={
                            <Typography>
                                {Intl.NumberFormat().format(props.item.prix)}
                            </Typography>
                        }
                        color='primary'
                        avatar={<Avatar>Ar</Avatar>}
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </ListItem>
    )
}
export default withStyles(styles)(CarteListItem)