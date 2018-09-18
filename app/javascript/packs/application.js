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
import { renderMap} from "components/show-map.js"
import { indexMap} from "components/show-map.js"
import { renderMarkers } from "components/show-map.js"
import { autoUpload} from "components/auto_upload.js"
import {initMap} from "components/g-map.js"
formRace()
renderMap()
autoUpload()
indexMap()
//initMap()



//
// document.addEventListener("DOMContentLoaded", function() {
//
//   let checkboxes = document.querySelectorAll("input[type=checkbox]");
//   if (checkboxes != null){
//     for (let i = 0; i < checkboxes.length; i++) {
//       checkboxes[i].addEventListener( 'change', function() {
//           let form = document.getElementById('filter_form');
//           Rails.fire(form, 'submit');
//       });
//     }
//   }
// });
