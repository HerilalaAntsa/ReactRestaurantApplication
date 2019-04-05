import React from 'react';

function RestaurantList(props){
    return (
        <li onClick={() => props.removeHobby(props.cle)} index={props.index}>{props.name}</li>
    )
}
export default RestaurantList