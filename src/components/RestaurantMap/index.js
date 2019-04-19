import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

function RestaurantMap(props) {
        
    const position = [props.position.lat, props.position.lng];
    return (
      <LeafletMap center={position} zoom={8}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Le restaurant {props.nom} se trouve ici !
          </Popup>
        </Marker>
      </LeafletMap>
    );
}
export default RestaurantMap