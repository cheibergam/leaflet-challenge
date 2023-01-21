var myMap;

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
  myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 4,
    layers: [streetMap]
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
  };

  // Adding the Layer Control to the map, assigning the baseMaps for the different layers.
  L.control.layers(baseMaps, {}).addTo(myMap);
  
  
  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    // Adding the Groups
    div.innerHTML = '<center><b>Depth</b></center><hr>' + 
                    '<i style="background:#00ff15"></i>' + '-10 &ndash; 10<br><br>' + 
                    '<i style="background:#b3e85d"></i>' + '10 &ndash; 30<br><br>' + 
                    '<i style="background:#faf737"></i>' + '30 &ndash; 50<br><br>' + 
                    '<i style="background:#cc9600"></i>' + '50 &ndash; 70<br><br>' + 
                    '<i style="background:#ff6726"></i>' + '70 &ndash; 90<br><br>' + 
                    '<i style="background:#ff0000"></i>' + '90+<br><br>';

    return div;
  };
  // Adding the legend to the map
  legend.addTo(myMap);
}

// Identifying the color based on the Depth group/class
function getColor(depth) {
  return depth > 90 ? '#ff0000' :
         depth > 70 ? '#ff6726' :
         depth > 50 ? '#cc9600' :
         depth > 30 ? '#faf737' :
         depth > 10 ? '#b3e85d' :
                      '#00ff15' ;
}

// Calculating the Radius based on the Magnitude
function getRadius(magnitude) {
  return (20000 * magnitude);
}

// Function that loads the data from the URL, adding the circles and markers popup.
function loadData() {
  const EARTHQUAKE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  // Get the data with d3.
  d3.json(EARTHQUAKE_URL).then(function(data) {
    
    // Processing each row from the data loaded from the URL
    for (var i=0; i<data.features.length; i++) {
      // Getting the coordinates
      var coordinates = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];

      // Adding the circle to the map. Color Range as per Depth, and Radius as per Magnitude
      L.circle(coordinates, {
        fillOpacity: 0.8,
        color: '#787878',
        weight: 1,
        fillColor: getColor(data.features[i].geometry.coordinates[2]),
        radius: getRadius(data.features[i].properties.mag)
      }).bindPopup(`<h3>${data.features[i].properties.place}</h3><hr><b>Magnitute:</b> ${data.features[i].properties.mag}<br> <b>Depth:</b> ${data.features[i].geometry.coordinates[2]}<hr><b>Date:</b> ${new Date(data.features[i].properties.time)}`).addTo(myMap);
    }
  });
}

// Function that loads the Tectonic data from the given URL, adding to the Map.
function loadTectonic() {
  const TECTONIC_URL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  d3.json(TECTONIC_URL).then(function(data){
    L.geoJson(data, {
      color: "#180070",
      weight: 2
    }).addTo(myMap)
  });
}

// Function that initialises the Map and load the data from the URL
function init() {
  createMap();
  loadData();
  loadTectonic();
}

init();