var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 42.0451, lng: -87.6877},
    zoom: 14
  });


}
var markers = [];


function search() {
  var address = document.getElementById("address1").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var geocoder = new google.maps.Geocoder();
  var a = address + " " + city + " " + state + " " + zip;


  geocoder.geocode({'address': a}, function(results, status) {
  if (status === 'OK') {
    map.setCenter(results[0].geometry.location);
    map.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location
    });
    var infoWindow=new google.maps.InfoWindow({
    content: a});
    infoWindow.open(map, marker);
    marker.addListener('click', function(){
    infoWindow.open(map, marker)})

    map.addListener('click', function(){
      infoWindow.close();});

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {location: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, radius: 5000, name: ['recycle']},
      function(results) {
        if (status !== 'OK') return;
        addMarkers(results);
      });



  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}


function addMarkers(d) {
  for (var i = 0; i < d.length; i ++) {

  var marker = new google.maps.Marker({
    map:map,
    position: d[i].geometry.location
  });

  markers.push(marker);
  var infoWindow = new google.maps.InfoWindow({
    content: d[i].name
  })

  infoWindow.open(map, marker);
  marker.addListener('click', function(){
  infoWindow.open(map, marker)})

  map.addListener('click', function(){
    infoWindow.close();});
  }
}

initMap();
