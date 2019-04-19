import React, { Component } from 'react';
import RestaurantDetail from './RestaurantDetail';
import { base } from '../../constants/base';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Paper, Typography, withStyles, Button } from '@material-ui/core';
import RestaurantMap from '../RestaurantMap';
import Leaflet from 'leaflet';
import '../RestaurantMap/index.css';
import 'leaflet/dist/leaflet.css';
Leaflet.Icon.Default.imagePath = 'leaflet/dist/images/';

const styles = theme => ({
  titre: {
    fontFamily: 'Allura'
  },
  main: {
    padding: theme.spacing.unit,
  }
})
class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      restaurant: {
        position : {
          lat: 0,
          lng: 0
        }
      },
      value: 0,
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentWillMount() {
    console.log("Will mount")
    this.ref = base.syncState("restaurant/" + this.state.id, {
      context: this,
      state: 'restaurant',
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Restaurant">
        <div>
          <Paper className={classes.main}>
            <Typography variant="h2" className={classes.titre} gutterBottom>Restaurant {this.state.restaurant.nom}</Typography>
            <RestaurantDetail item={this.state.restaurant}/>
            <RestaurantMap position={this.state.restaurant.position} nom={this.state.restaurant.nom}/>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Restaurant);
