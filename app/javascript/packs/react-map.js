import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { calculateCenter } from "packs/calculateCenter"

const { compose, withProps, withStateHandlers } = require("recompose");
const {
  GoogleMap,
  Marker,
  InfoWindow,
  withGoogleMap
} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
    infoIndex: null
  }), {
    showInfo: ({ isOpen, infoIndex }) => (index) => ({
      isOpen: infoIndex !== index || !isOpen,
      infoIndex: index
    })
  }),
  withGoogleMap,
)

(props =>
  <GoogleMap
    defaultZoom={6}
    defaultCenter={props.markers.lenght == 1 ? props.markers[0] : calculateCenter(props.markers)}
  >

  {props.races.map((e, i)=> {
    return(
      <Marker key={i} position={{lat: e.latitude, lng: e.longitude}} onMouseOver={() => props.showInfo(i)}>
        {(props.isOpen && props.infoIndex == i) &&
          <InfoWindow onCloseClick={props.showInfo}>
            <a href={'/races/' + e.id}>{e.name}</a>
          </InfoWindow>}
     </Marker>
    )
  })}


  </GoogleMap>
);



export { MapWithAMakredInfoWindow }
