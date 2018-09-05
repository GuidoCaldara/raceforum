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


const map = document.querySelector("#show-map")
const m = JSON.parse(map.dataset.markers)
const mymap = L.map(map).setView([m.lat, m.lng], 6);
L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(mymap);
var marker = L.marker([m.lat, m.lng]).addTo(mymap);
