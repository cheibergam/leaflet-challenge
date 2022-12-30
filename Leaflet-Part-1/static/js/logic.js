const URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Function that creates the Map and all the required Tile Layers
function createMap() {

  // Creating the different Tile Layers (Street Map and Topographic Map)
  var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
  var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Creating the Map object
  var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11,
    layers: [streetMap]
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
  };

  // Adding the Layer Control to the map, assigning the baseMaps for the different layers.
  L.control.layers(baseMaps, {}).addTo(myMap);
  
}

// Function that loads the data from the URL
function loadData() {

}

// Function that initialises the Map and load the data from the URL
function init() {
  createMap();
  loadData();
}

init();







/*
// Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=10000";

// Assemble the API query URL.
var url = baseURL + date + complaint + limit;

// Get the data with d3.
d3.json(url).then(function(response) {

  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

  // Loop through the data.
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    var location = response[i].location;

    // Check for the location property.
    if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});

*/