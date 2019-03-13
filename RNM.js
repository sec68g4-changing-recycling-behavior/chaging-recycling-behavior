var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 42.0451, lng: -87.6877},
    zoom: 14
  });

}
var markers = [];


function searchOn() {
  clearMarkers();

  var address = document.getElementById("address1").value;
  if (address == "") {
    document.getElementById("address label").innerHTML = "Fill in your address";
    document.getElementById("address label").style.color = "red";
    return
  }
  if (document.getElementById("address label").style.color == "red"){
  document.getElementById("address label").innerHTML = "Address";
  document.getElementById("address label").style.color = "#5264AE";}

  var city = document.getElementById("city").value;
  if (city == "") {
    document.getElementById("city label").innerHTML = "Fill in your city";
    document.getElementById("city label").style.color = "red";
    return
  }
  if (document.getElementById("city label").style.color == "red") {
  document.getElementById("city label").innerHTML = "City";
  document.getElementById("city label").style.color = "#5264AE";}

  var state = document.getElementById("state").value;
  if (state == "") {
    document.getElementById("stateLabel").innerHTML = "Fill in your State";
    document.getElementById("stateLabel").style.color = "red";
    return
  }

  var zip = document.getElementById("zip").value;
  if (zip == "") {
    document.getElementById("zip label").innerHTML = "Fill in your zip code";
    document.getElementById("zip label").style.color = "red";
    return
  }

  if (!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip))){
    document.getElementById("zip").value = "";
    document.getElementById("zip label").innerHTML = "Invalid zip code";
    document.getElementById("zip label").style.color = "red";
    return
  };
  if (document.getElementById("zip label").style.color == "red") {
  document.getElementById("zip label").innerHTML = "Zip";
  document.getElementById("zip label").style.color = "#5264AE";

}
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

    map.zoom = 12.5;

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {location: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, radius: 5000, name: ['recycle']},
      function(results) {
        if (status !== 'OK') return;
        for (var i = 0; i < results.length; i ++) {
        addMarkers(results[i]);}
      });
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}


function addMarkers(d) {


  var marker = new google.maps.Marker({
    map:map,
    position: d.geometry.location
  });

  markers.push(marker);
  var infoWindow = new google.maps.InfoWindow({
    content: d.name
  })

  infoWindow.open(map, marker);

  marker.addListener('click', function(){
  infoWindow.open(map, marker)})

  map.addListener('click', function(){
    infoWindow.close();});

}

function clearMarkers(){
   markers.forEach(function(marker) {
     marker.setMap(null);
   });
   markers = [];
}


function changeColor() {
  document.getElementById("stateLabel").innerHTML = "State";
  if (document.getElementById("state").value != ""){
  document.getElementById("stateLabel").style.fontSize = "20px";
  document.getElementById("stateLabel").style.color = "#5264AE";}
  else {
    document.getElementById("stateLabel").style.fontSize = "18px";
    document.getElementById("stateLabel").style.color = "black";
  }
}

function seText(s, l) {
  if (document.getElementById(l).style.color == "red"){
  document.getElementById(l).innerHTML = s;
  document.getElementById(l).style.color = "#5264AE";}
}
initMap();
