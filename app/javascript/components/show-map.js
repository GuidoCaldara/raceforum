

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
      var el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el)
      .setLngLat([m.lng, m.lat])
      .addTo(map);
  }
}

const indexMap = () => {

  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  const mapContainer = document.querySelector("#index-map")
  if (mapContainer != null ){
    const m = (JSON.parse(mapContainer.dataset.markers));
    const c = JSON.parse(mapContainer.dataset.cordinates)
    console.log(c);

    const latLng = m.map( e => [e.lng, e.lat])

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpZG9jYWxkYXJhIiwiYSI6ImNqbHB3dTBhODA2MDEzdnRhc2cxYmhqb3MifQ.LhCv9m9kuHP5uXeU14lkeA';


    var map = new mapboxgl.Map({
        container: mapContainer, // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        center: c, // starting position [lng, lat]
        zoom: 3, // starting zoom
    });


     map.addControl(new mapboxgl.NavigationControl())
     var markerArray = [];
     m.forEach((e) => {
       var el = document.createElement('i');
       el.className = 'fas fa-map-marker marker';
       el.dataset.value = e.id;
       el.setAttribute("id", `marker-${e.id}`)
       new mapboxgl.Marker(el)
       .setLngLat([e.lng, e.lat])
       .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
       .setHTML( '<a href="races/'+ e.id +'"><h5>' + e.name + '</h5></a>'))
       .addTo(map);
       markerArray.push(L.marker([e.lng, e.lat]));

     })

}
}


//
// const renderMarkers = () => {
//   var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
//   var map = map
//   const mapContainer = document.querySelector("#index-map")
//   const m = (JSON.parse(mapContainer.dataset.markers));
//   m.forEach((e) => {
//     var el = document.createElement('div');
//     el.className = 'marker';
//     el.dataset.value = e.id;
//     new mapboxgl.Marker(el)
//     .setLngLat([e.lng, e.lat])
//     .addTo(map);
//   })
// }

export { renderMarkers }
export { renderMap }
export { indexMap }
// const mymap = L.map(map).setView([m.lat, m.lng], 6);
// L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
//   maxZoom: 19,
// }).addTo(mymap);
// var marker = L.marker([m.lat, m.lng]).addTo(mymap);
