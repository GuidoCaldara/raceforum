/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import {formRace} from "components/new_race_form.js"
import L from 'leaflet'
formRace()

//
 const mapContainer = document.querySelector("#show-map")
const m = JSON.parse(mapContainer.dataset.markers)
// const mymap = L.map(map).setView([m.lat, m.lng], 6);
// L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
//   maxZoom: 19,
// }).addTo(mymap);
// var marker = L.marker([m.lat, m.lng]).addTo(mymap);



var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpZG9jYWxkYXJhIiwiYSI6ImNqbHB3dTBhODA2MDEzdnRhc2cxYmhqb3MifQ.LhCv9m9kuHP5uXeU14lkeA';


var map = new mapboxgl.Map({
    container: mapContainer, // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [m.lng, m.lat], // starting position [lng, lat]
    zoom: 6 // starting zoom
});
  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat([m.lng, m.lat])
  .addTo(map);
