

const renderMap = () => {
  const mapContainer = document.querySelector("#show-map")
  if (mapContainer != null ){
    const m = JSON.parse(mapContainer.dataset.markers)
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

  }
}


export { renderMap }
// const mymap = L.map(map).setView([m.lat, m.lng], 6);
// L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
//   maxZoom: 19,
// }).addTo(mymap);
// var marker = L.marker([m.lat, m.lng]).addTo(mymap);
