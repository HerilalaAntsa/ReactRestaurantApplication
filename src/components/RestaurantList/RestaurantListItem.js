import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT } from '../../constants/routes';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, withStyles } from '@material-ui/core';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import { app } from '../../constants/base';

const styles = {
    card: {
      maxWidth: 245,
    },
    media: {
      height: 190,
    },
};
var storageRef = app.storage().ref();
class RestaurantListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            img : '',
        }
    }
    getImageUrl(value){
        storageRef.child(value).getDownloadURL().then((url)=>{
            this.setState({
                img : url,
            })
        }).catch(()=>{});
    }
    
    render(){
        this.getImageUrl(this.props.item.photo);
        const { classes } = this.props;
        return (
            <Grid item>
                <Card className={classes.card} square elevation={0} >
                    <CardActionArea component={Link}
                                to={RESTAURANT + '/' + this.props.item._id} >
                        <CardMedia
                            className={classes.media}
                            image={this.state.img}
                            title={this.props.item.nom}
                        />
                        <CardContent>
                            <Typography variant="h6">
                                {this.props.item.nom}
                            </Typography>
                            <Typography color="textSecondary">
                                <RestaurantOutlinedIcon fontSize="inherit"/> {this.props.item.cuisine}
                            </Typography>
                            <Typography color="textSecondary">
                                <LocationOnOutlinedIcon fontSize="small"/> {this.props.item.adresse}
                            </Typography>
                            <Typography color="textSecondary">
                                <PhoneOutlinedIcon fontSize="small"/> {this.props.item.telephone}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}
export default withStyles(styles)(RestaurantListItem)