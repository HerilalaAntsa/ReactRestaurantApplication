import React from 'react';

function MenuItem(props){
    return (
        <li>
            {props.nom}
            {props.description}
        </li>
    )
}
export default MenuItem