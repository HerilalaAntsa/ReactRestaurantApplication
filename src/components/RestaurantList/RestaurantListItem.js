import React from 'react';
import {Link} from 'react-router-dom';
import {RESTAURANT} from '../../constants/routes';

function RestaurantListItem(props){
    return (
        <li key={props.item._id} index={props.item.index}>
            <Link to={RESTAURANT + '/' + props.item._id} >{props.item.nom}</Link>        
        </li>
    )
}
export default RestaurantListItem