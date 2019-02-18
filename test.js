var address;
var city;
var state;

function getParams(){
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        for (var i=0; i<pairs.length; i++){
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    return params;
}
function write() {
  params = getParams();
  address = unescape(params["address"]);
  city = unescape(params["city"]);
  state = unescape(params["state"]);
  document.write("address: " + address + "<br>");
  document.write("city: " + city + "<br>");
  document.write("state: " + state + "<br>");}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  var geocoder = new google.maps.Geocoder();
  var a = address + " " + city + " " + state;
  geocoder.geocode({'address': a}, function(results, status) {
  if (status === 'OK') {
    map.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location
    });
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}
