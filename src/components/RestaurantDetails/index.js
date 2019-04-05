import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hobby from './components/Hobby';
import base from './base';

class Restaurant extends Component {
  constructor(props){
    super(props);
    this.state = { hobbies: ['Football', 'Basket', 'Chant'] }
  }
  removeHobby(key) {
    const copieHobbies = {...this.state.hobbies}; // spread operator permert de cloner des object
    //delete copieHobbies[key]
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
    //alert("toto")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("hobbies", {
      context: this,
      state: 'hobbies'
    });
  }
  
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    let listHobbies = Object.keys(this.state.hobbies).map((key,index) => {
      let el = this.state.hobbies[key];
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