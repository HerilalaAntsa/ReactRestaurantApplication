import React from 'react';
import { Button, withStyles, Grid, Paper, Typography, Divider, List } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const styles = theme => ({
    titre: {
        fontFamily: 'Allura'
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});
function MenuListItem(props) {
    const { classes } = props;
    let dessert = Object.keys(props.item.dessert).map((key) => {
        let item = props.item.dessert[key];
        return <li key={item._id}>
            {item.nom}
        </li>
    });
    let plat = Object.keys(props.item.plat).map((key) => {
        let item = props.item.plat[key];
        return <li key={item._id}>
            {item.nom}
        </li>
    });
    let horsdoeuvre = Object.keys(props.item.horsdoeuvre).map((key) => {
        let item = props.item.horsdoeuvre[key];
        return <li key={item._id}>
            {item.nom}
        </li>
    })
    return (
        <Paper elevation={3} align="center">
            <Grid container justify="center">
                <Grid item style={{padding:20}}>
                    <Typography
                        className={classes.titre}
                        variant="h4"
                        align="center"
                        gutterBottom>
                        {props.item.nom}
                    <Divider variant="middle" />
                    </Typography>
                    Prix : Ar {Intl.NumberFormat().format(props.item.prix)}
                    <List align="center">
                        <Typography variant="h6" color="secondary">Hors d'oeuvre</Typography>
                        {horsdoeuvre}
                    </List>
                    <List align="center">
                        <Typography variant="h6" color="secondary">Plat</Typography>
                        {plat}
                    </List>
                    <List align="center">
                        <Typography variant="h6" color="secondary">Dessert</Typography>
                        {dessert}
                    </List>
                </Grid>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" onClick={() => props.handleClickOpenDetail(props.item)}>
                Voir ce menu
            </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => props.handleClickOpenCommande(props.item)}>
                <AddShoppingCartIcon className={classes.leftIcon} />
                Commander ce menu
            </Button>
        </Paper>
    )
}
export default withStyles(styles)(MenuListItem);
