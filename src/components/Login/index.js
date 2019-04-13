import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {app, base } from '../../constants/base';

class Login extends Component {
  constructor(props){
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
    }
  }

  authWithEmailPassword(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        console.log(providers);
        if(providers.length === 0){
          // creation utilisateur
          app.auth().createUserWithEmailAndPassword(email, password);
        }else if(providers.indexOf("password") === -1) {
          // facebook par exemple
          this.LoginForm.reset();
        }else{
          // Login
          return app.auth().signInWithEmailAndPassword(email, password);
        }

      })
      .then((user) => {
        if( user && user.email){
          this.LoginForm.reset();
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/' />
    }
    return (
      <div>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} 
          ref={(form) => { this.LoginForm = form }}>
          <label>
            Email
            <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label>
            Mot de passe
            <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Mot de passe"></input>
          </label>
          <input type="submit" value="Log In"></input>
        </form>
      </div>
  )}
}

export default Login;