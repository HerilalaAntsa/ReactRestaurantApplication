import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Grid, Button } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { app } from '../../constants/base';

const storageRef = app.storage().ref();
class RestaurantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
        }
    }
    getImageUrl(value) {
        storageRef.child(value).getDownloadURL().then((url) => {
            this.setState({
                img: url,
            })
        }).catch(()=>{});
    }
    render() {
        this.getImageUrl(this.props.item.photo);
        return (
            <Grid container spacing={8} wrap="nowrap" alignItems="center">
                <Grid item>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        type="file"
                        name={this.props.item._id}
                        id='resto-img-input'
                        onChange={this.props.handleUploadFile}
                    />
                    <label htmlFor='resto-img-input'>
                        <Button variant="text"
                            focusRipple component="span">
                            <img width={350} src={this.state.img} alt={this.props.item.nom} />
                        </Button>
                    </label>
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Button variant="outlined" color="primary" component={Link} to={ROUTES.MENURESTAURANT + '/' + this.props.item._id}>Voir ses Menus</Button>
                            <Button variant="outlined" color="primary" component={Link} to={ROUTES.CARTERESTAURANT + '/' + this.props.item._id}>Voir sa Carte</Button>
                        </Grid>
                    </Grid>
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <RestaurantIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.item.cuisine} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.item.adresse} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary={this.props.item.telephone} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={this.props.item.description} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        )
    }
}
export default RestaurantDetail