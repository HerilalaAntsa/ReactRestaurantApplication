import React, { Component } from 'react';
import RestaurantList from './RestaurantList';
import base from '../../constants/base';

class Accueil extends Component {
  constructor(props){
    super(props);
    this.state = { restaurantList: [] }
  } 
    
  changeInputMessage(event) {
    
		this.setState({
			input: event.target.value
		});
  }
  
  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("restaurantList", {
      context: this,
      state: 'restaurantList'
    });
  }

  componentWillUnmount() {
      console.log("Will unmount");
      base.removeBinding(this.ref);
  }

  render() {
    let listRestaurant = this.state.restaurantList.map((restaurant) => {
      return <RestaurantList key = {restaurant._id}
                    cle = {restaurant.index}
                    name={restaurant.nom}>
             </RestaurantList>
    })
    return (
      <div className="Accueil">
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

export default Accueil;
