import React, { Component } from 'react';
import MenuItem from './MenuItem';
import base from '../../constants/base';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.match.params.restaurant,
      id: props.match.params.id,
      menu: {}
    }
  }

  changeInputMessage(event) {

    this.setState({
      input: event.target.value
    });
  }

  componentWillMount() {
    console.log("Will mount")
    let url = 'menu/' + this.state.restaurant + '/' + this.state.id;
    // this runs right before the <App> is rendered
    this.ref = base.syncState(url, {
      context: this,
      state: 'menu'
    });
  }

  componentWillUnmount() {
    console.log("Will unmount");
    base.removeBinding(this.ref);
  }

  render() {
    let detail = Object.keys(this.state.menu).map((property) => {
      let value = this.state.menu[property];
      if (typeof(value) == 'object') {
        return Object.keys(value).map((detail) => {
          let item = value[detail];
          return <MenuItem
            key={detail}
            nom={item.nom}
            description={item.description}>
          </MenuItem>
        })
      }

    });
    console.log(detail);
    return (
      <div className="Menu">
        <div>
          <h2>Menu {this.state.menu.nom}</h2>
          <p>Prix {this.state.menu.prix}</p>
          <ul>
            {detail}
          </ul>
          <Link to={ROUTES.COMMANDERMENU + '/' + this.state.restaurant + '/' + this.state.id}>Commander</Link>
        </div>
      </div>
    );
  }
}

export default Menu;
