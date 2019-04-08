import React from 'react';

function RestaurantItem(props){
    return (
        <li>
            {props.titre} : {props.value}
        </li>
    )
}
export default RestaurantItem