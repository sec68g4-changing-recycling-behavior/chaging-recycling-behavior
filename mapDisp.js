var address1;
var address2;
var city;
var state;
var zip;
var date;
var notes;
var mat = "";

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

function processFormData() {
  params = getParams();
  address1 = cleanup(unescape(params["address1"]));
  address2 = cleanup(unescape(params["address2"]));
  city = cleanup(unescape(params["city"]));
  state = unescape(params["state"]);
  zip = cleanup(unescape(params["zip"]));
  date = new Date(cleanup(unescape(params["endDate"])) + "T12:00:00+0" + (new Date()).getTimezoneOffset()/60 + ":00");
  notes =  cleanup(unescape(params["notes"]));

  mat = getRecyclables("Metals", mat);
  mat = getRecyclables("Paper", mat);
  mat = getRecyclables("Plastics", mat);
  mat = getRecyclables("Electronics", mat);
  mat = getRecyclables("mat-other", mat);

  if (address2 == "")
	document.getElementById("formAddress").innerHTML = address1;
  else
	document.getElementById("formAddress").innerHTML = address1 + "</br>" + address2;
  document.getElementById("formCity").innerHTML = city;
  document.getElementById("formState").innerHTML = state;
  document.getElementById("formZip").innerHTML = zip;
  document.getElementById("formEndDate").innerHTML = date.toLocaleDateString();
  document.getElementById("formMaterials").innerHTML = mat;
  document.getElementById("formNotes").innerHTML = notes;
/*  document.write("Address: " + address1 + " " + address2 +"<br>");
  document.write("City: " + city + "<br>");
  document.write("State: " + state + "<br>");
  document.write("Zip: " + zip + "<br>");
  document.write("End Date: " + data + "<br>" );
  document.write("Materials: " + mat + "<br>");
  document.write("Notes: " + notes + "<br>"); */
  
  initMap();
}


function cleanup(s) {
    result = s;
    var idx = s.indexOf('+');
    if (idx != -1){
      result = s.substring(0, idx);
      result = result + ' ' + cleanup(s.substring(idx + 1, s.length));
    }
    return result;
}

function getRecyclables(p, s){
  if (params[p] == 'on') {
    if (s == ''){
      s = p;
    }
    else {
    s = s +", " + p;}

  }
  else if (params[p] != undefined && params[p] != "") {
	if (s != '')
		s = s + ", and "
    s = s + cleanup(unescape(params[p])) + " ";
  }
  return s;
}

  document.write("Address: " + address1 + " " + address2 +"<br>");
  document.write("City: " + city + "<br>");
  document.write("State: " + state + "<br>");
  document.write("Zip: " + zip + "<br>");
  document.write("End Date: " + data + "<br>" );
  document.write("Materials: " + mat + "<br>");
  document.write("Notes: " + notes + "<br>");




}


function cleanup(s) {
    result = s;
    var idx = s.indexOf('+');
    if (idx != -1){
      result = s.substring(0, idx);
      result = result + ' ' + cleanup(s.substring(idx + 1, s.length));
    }
    return result;
}

function getRecyclables(p, s){
  if (params[p] == 'on') {
    if (s == ''){
      s = p;
    }
    else {
    s = s +", " + p;}

  }
  else if (params[p] != undefined && params[p] != "") {
    s = s + ", and " +cleanup(unescape(params[p])) + " ";
  }
  return s;
}

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
