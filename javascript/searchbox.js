  //This will hold the searchBox model
var SearchHolder = {};

var SearchBoxController = (function(){

  function makeSearchBox(){
    var input = document.getElementById('pac-input');
    SearchHolder.searchBox = new google.maps.places.SearchBox(input);
  }

  function listenForSearch(){
    google.maps.event.addListener(SearchHolder.searchBox,"places_changed", displayResults)
  }

  function displayResults(event){
    var places = SearchHolder.searchBox.getPlaces();
    if (places.length === 0) {
      return
    }
    getBounds(places)
  }

  //this needs to be refactored
  function getBounds(places){
    var markers = [];
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: MapHolder.map,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);
      bounds.extend(place.geometry.location);
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    MapHolder.map.fitBounds(bounds);
  }

  return {
    enableSearch: function(){
      makeSearchBox();
      listenForSearch();
    }
  }
})()

google.maps.event.addDomListener(window, 'load', SearchBoxController.enableSearch);