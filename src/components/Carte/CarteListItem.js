import React from 'react';
import { Button, ListItem, ListItemAvatar, Avatar, ListItemText, withStyles, Chip, Grid, Typography, ListItemSecondaryAction } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

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
    return (
        <ListItem key={props.item._id} alignItems="flex-start" divider>
            <Grid container spacing={8} wrap="nowrap">
                <Grid item>
                    <img width={150} alt={props.item.nom} src="http://calgarypma.ca/wp-content/uploads/2018/01/default-thumbnail.jpg" />
                </Grid>
                <Grid item>
                    <Grid container direction="column">
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