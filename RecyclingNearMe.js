var map;

function init() {

   map = new google.maps.Map(document.getElementById("map3"),{
    center: {lat: 42.057918,lng: -87.675802} ,
    zoom: 16
  });


}

//create a dictionary of search results
var dict = {};
var batOn = {loc: {lat: 42.057918,lng: -87.675802}, text: "<h4>The Office of Research Safety (ORS) handles all battery waste, including lead-acid (automotive), mercury, lithium containing, alkaline (ordinary household), and rechargeable batteries. Batteries can be taken to Gwen Sullivan at the <strong>Technological Institute NG-71</strong>. ORS offers collection boxes for workspaces that must be picked up and returned to ORS.</h4>"};
var everLights = {lat:42.042413, lng: -87.699394};
var batOff = {loc: everLights, text: "<h4>Recyle batteries in downtown evanston at <a href = 'https://www.everlights.com'>everLights</a></h4>"};
var norris = {lat: 42.053373, lng: -87.672661};
var elecOn = {loc: norris, text: "<h4>Drop off your old computers, smartphones, or DVD players at Norris and take advantage of <a href = 'https://www.northwestern.edu/fm/services/computer-electronic-recycling/student-ecycling.html'>the Student eCycling Program</a>.</h4> "};
var elecOff = {loc: {lat: 42.056682, lng:-87.700742}, text: "<h4>The <a href = 'https://evanstonenvironment.org'><strong>Evanston Ecology Center</strong></a> is available at normal busniness hours for community members to drop off cell phones, cordless phones, digital cameras, video recorders, laptop computers, MP3 players and ink cartridges for recycling.</h4>"}
var plasticOn = {loc: norris, text: "<h4>Place plastic bags in the bin on <strong>the ground floor of Norris </strong>, near the elevator during the academic year. Most grocery stores also take plastic bags for recycling.</h4>"};
var inkOn = {loc: {lat:42.052925, lng:-87.678641}, text: "<h4>Ink cartridges are collected for recycling in the <strong>Foster-Walker residence hall mailrooms</strong> during the academic year. </h4>"};
var batteries = [batOn, batOff];
dict["batteries"] = batteries;
var electronics = [elecOn, elecOff];
dict["electronics"] = electronics;
var plastic = [plasticOn, plasticOn];
dict["plastic"] = plastic;
var ink = [inkOn, elecOff];
dict["ink"] = ink;

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
