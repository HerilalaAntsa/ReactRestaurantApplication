import React, { Component } from 'react';
import MenuListItem from './MenuListItem';
import base from '../../constants/base';

class MenuList extends Component {
  constructor(props){
    super(props);
    this.state = { id: props.match.params.id, menu: {} }
  }
    
  changeInputMessage(event) {
    
		this.setState({
			input: event.target.value
		});
  }
  
  componentWillMount() {
    console.log("Will mount")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("menu/" + this.state.id, {
      context: this,
      state: 'menu'
    });
  }

  componentWillUnmount() {
      console.log("Will unmount");
      base.removeBinding(this.ref);
  }

  render() {
    let menu = Object.keys(this.state.menu).map((key) => {
      let item = this.state.menu[key];
      return <MenuListItem key={key} id={this.state.id} item={item} />
    })
    return (
      <div className="MenuList">
        <h1>Les Menus Proposés</h1>
          <ul>
            {menu}
          </ul>
      </div>
    );
  }
}

export default MenuList;
