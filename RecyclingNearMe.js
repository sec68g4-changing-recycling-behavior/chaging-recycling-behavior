var map;

function init() {

   map = new google.maps.Map(document.getElementById("map"),{
    center: {lat: 42.0451, lng: -87.6877},
    zoom: 12
  });


}

//create a dictionary of search results
var dict = {};
var batOn = {loc: {lat: 42.057918,lng: -87.675802}, text: "The Office of Research Safety (ORS) handles all battery waste, including lead-acid (automotive), mercury, lithium containing, alkaline (ordinary household), and rechargeable batteries. Batteries can be taken to Gwen Sullivan at the Technological Institute NG-71. ORS offers collection boxes for workspaces that must be picked up and returned to ORS."};
var everLights = {lat:42.042413, lng: -87.699394};
var batOff = {loc: everLights, text: "Recyle batteries in downtown evanston at <a href = 'https://www.everlights.com'>everLights</a>"}
var batteries = [batOn, batOff];
dict["batteries"] = batteries;

var markers = []

function search() {
  clearMarkers();
  var q2 = document.getElementById("q2").value;
  var q1 = document.getElementById("q1").value;
  if (q2 != "1") {
  addMarker(dict[q1][0]);}
  if (q2 != "0") {
  addMarker(dict[q1][1]);}

}

function addMarker(o) {

  var marker = new google.maps.Marker({
    map: map,
    position: o.loc
  });


  var infoWindow = new google.maps.InfoWindow({
    content: o.text
  });

  infoWindow.open(map, marker);

  marker.addListener('click', function(){
  infoWindow.open(map, marker);});

  map.addListener('click', function(){
    infoWindow.close();});

  markers.push(marker);
}

function clearMarkers(){
   markers.forEach(function(marker) {
     marker.setMap(null);
   });
   markers = [];
}
