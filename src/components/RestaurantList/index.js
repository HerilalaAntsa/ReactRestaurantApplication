import React, { Component } from 'react';
import base from '../../constants/base';
import RestaurantListItem from './RestaurantListItem';

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurant: {} }
  }

  changeInputMessage(event) {

    this.setState({
      input: event.target.value
    });
  }

  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("restaurant", {
      context: this,
      state: 'restaurant'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    let listRestaurant = Object.keys(this.state.restaurant).map((id) => {
      let item = this.state.restaurant[id];
      return <RestaurantListItem key={id}
        item={item}>
      </RestaurantListItem>
    })
    return (
      <div className="RestaurantList">
        <div>
          <h2>Liste des restaurant</h2>
          Nombre de restaurant : {listRestaurant.length}
          <ul>
            {listRestaurant}
          </ul>
        </div>
      </div>
    );
  }
}

export default RestaurantList;
