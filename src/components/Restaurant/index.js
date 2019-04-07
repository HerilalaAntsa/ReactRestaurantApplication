import React, { Component } from 'react';
import RestaurantDetail from './RestaurantItem';
import base from '../../constants/base';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id:props.match.params.id,
      restaurant: {}
    }
  }

  changeInputMessage(event) {
    this.setState({
      input: event.target.value
    });
  }

  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("restaurant/" + this.state.id, {
      context: this,
      state: 'restaurant'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    let restaurant = Object.keys(this.state.restaurant).map((property) => {
      let item = this.state.restaurant[property];
      return <RestaurantDetail
        key={item._id + property}
        titre={property}
        value={item}>
      </RestaurantDetail>
    })
    return (
      <div className="Restaurant">
        <div>
          <h2>Restaurant {this.state.restaurant.nom}</h2>
          <ul>
            {restaurant}
          </ul>
          <Link to={ROUTES.MENURESTAURANT + '/' + this.state.restaurant._id}>Menu </Link>
          <Link to={ROUTES.CARTERESTAURANT + '/' + this.state.restaurant._id}>Carte </Link>
        </div>
      </div>
    );
  }
}

export default Restaurant;
