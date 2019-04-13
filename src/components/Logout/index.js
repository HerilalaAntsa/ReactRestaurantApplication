import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {app, base } from '../../constants/base';
import CircularProgress from '@material-ui/core/CircularProgress';

class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
  }

  componentWillMount(){
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    })
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3>Logging Out</h3>
        <CircularProgress disableShrink />;
      </div>
    )}
}

export default Logout;