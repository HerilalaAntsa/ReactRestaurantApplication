import React, { Component } from 'react';
import './App.css';
import Hobby from './components/Hobby'
import base from './base';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { restaurantList: {} }
  }
  removeHobby(key) {
    const copieHobbies = {...this.state.hobbies}; // spread operator permert de cloner des object
    copieHobbies[key] = null;
    this.setState({
      hobbies:copieHobbies
    })
	}  
  
  addHobby() {
    const copieHobbies = {...this.state.hobbies}; // spread operator permert de cloner des object
    
    copieHobbies['hobby' + Math.random()] = this.input.value;
		this.setState({
			hobbies: copieHobbies
    });
    console.log("Hobbies added" + this.state.hobbies);
    this.input.value='';
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
    let listRestaurant = Object.keys(this.state.restaurantList).map((key,index) => {
      let el = this.state.restaurantList[key];
      return <Hobby key = {index}
                    cle = {key}
                    name={el}
                    removeHobby={this.removeHobby.bind(this)}>
              {el}
             </Hobby>
    })
    return (
      <div className="App">
      <div>
        <h2>Liste des hobbies</h2>
        Nombre de hobbies : {listHobbies.length}
          <ul>
        {listHobbies}
        </ul>
        <input
                ref={(input) => this.input = input}
                type="text" 
                placeholder="Ecrivez une hobby .."/>
        <button onClick={() => this.addHobby()}>Nouveau Hobby</button>
        </div>
      </div>
    );
  }
}

export default App;
