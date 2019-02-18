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
  address1 = unescape(params["address1"]);
  address2 = unescape(params["address2"]);
  city = unescape(params["city"]);
  state = unescape(params["state"]);
  zip = unescape(params["zip"]);
  document.write("address: " + address1 + " " + address2 +"<br>");
  document.write("city: " + city + "<br>");
  document.write("state: " + state + "<br>");
  document.write("zip: " + zip + "<br>");}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.0451, lng: -87.6877},
    zoom: 8
  });

  var geocoder = new google.maps.Geocoder();
  var a = address1 + " " + address2 + " " + city + " " + state + " " + zip;
  geocoder.geocode({'address': a}, function(results, status) {
  if (status === 'OK') {
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

  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}
