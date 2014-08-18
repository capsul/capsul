//This will hold the searchBox model
var SearchHolder = (function(){
  return {}
})()


var SearchBoxController = (function(holder){
  return {

    enableSearch: function(){
      this.makeSearchBox();
      this.listenForSearch();
    },

    makeSearchBox: function(){
      var input = document.getElementById('pac-input');
      holder.searchBox = new google.maps.places.SearchBox(input);
    },

    listenForSearch: function(){
      google.maps.event.addListener(holder.searchBox,"places_changed", this.displayResults.bind(this))
    },

    displayResults: function(event){
      var places = holder.searchBox.getPlaces();
      if (places.length === 0) {
        return
      }
      this.getBounds(places)
    },

    //this needs to be refactored
    getBounds: function(places){
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
  }
}(SearchHolder))

google.maps.event.addDomListener(window, 'load', SearchBoxController.enableSearch.bind(SearchBoxController));