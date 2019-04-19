import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Grid, Button } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

function RestaurantDetail(props){
    return (
        <Grid container spacing={8} wrap="nowrap" alignItems="center">
            <Grid item>
                <img width={350} src={props.item.photo} alt={props.item.nom} />
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Button variant="outlined" color="primary" component={Link} to={ROUTES.MENURESTAURANT + '/' + props.item._id }>Voir ses Menus</Button>
                        <Button variant="outlined" color="primary" component={Link} to={ROUTES.CARTERESTAURANT + '/' + props.item._id }>Voir sa Carte</Button>
                    </Grid>
                </Grid>
                <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.item.cuisine} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.item.adresse} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.item.telephone} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={props.item.description} />
                    </ListItem>
                </List>
            </Grid>
        </Grid>        
    )
}
export default RestaurantDetail