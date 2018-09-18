// const initMap = () => {
//   const mapContainer = document.querySelector("#index-map")
//   if (mapContainer != null) {
//     const m = (JSON.parse(mapContainer.dataset.markers));
//
//     let map = new google.maps.Map(mapContainer, {
//       center: {
//         lat: -34.397,
//         lng: 150.644
//       },
//       zoom: 8
//     });
//
//     let bounds = new google.maps.LatLngBounds();
//     m.forEach((e) => {
//       var marker = new google.maps.Marker({
//         position: {
//           lat: e.lat,
//           lng: e.lng
//         },
//         map: map
//       });
// marker.set('id', `marker-${e.id}`)
//       let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
//       bounds.extend(loc);
//     })
//     map.fitBounds(bounds);
//     map.panToBounds(bounds);
//
//   }
//
// }
//
// export {
//   initMap
// }
