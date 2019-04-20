import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT } from '../../constants/routes';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, withStyles } from '@material-ui/core';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';

const styles = {
    card: {
      maxWidth: 245,
    },
    media: {
      height: 190,
    },
};
function RestaurantListItem(props) {
    const { classes } = props;
    return (
        <Grid item>
            <Card className={classes.card} square elevation={0} >
                <CardActionArea component={Link}
                            to={RESTAURANT + '/' + props.item._id} >
                    <CardMedia
                        className={classes.media}
                        image={props.item.photo}
                        title={props.item.nom}
                    />
                    <CardContent>
                        <Typography variant="h6">
                            {props.item.nom}
                        </Typography>
                        <Typography color="textSecondary">
                            <RestaurantOutlinedIcon fontSize="inherit"/> {props.item.cuisine}
                        </Typography>
                        <Typography color="textSecondary">
                            <LocationOnOutlinedIcon fontSize="small"/> {props.item.adresse}
                        </Typography>
                        <Typography color="textSecondary">
                            <PhoneOutlinedIcon fontSize="small"/> {props.item.telephone}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
export default withStyles(styles)(RestaurantListItem)