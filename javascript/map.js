
//Will hold the map model
var MapHolder = {};

//Map Controller Below
var MapController = (function(){

    function makeGoogleMap() {
      var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 4,
        center: new google.maps.LatLng(37.1, -95.7),
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        streetViewControl: false
      };

      MapHolder.map = new google.maps.Map(document.getElementById('map-canvas'), myOptions)
    }

    function listenForLocationChange(){
      google.maps.event.addListener(MapHolder.map,"bounds_changed", updateBounds)
    }

    function updateBounds(){
      var bounds = MapHolder.map.getBounds();

      //hacky. Need to fix but for now it works.
      if (MapHolder.map.getZoom() !== 4) {
        MapHolder.map.setZoom(14);
      }
      SearchHolder.searchBox.setBounds(bounds);
    }

  return {

    enableMap: function(){
      makeGoogleMap();
      listenForLocationChange();
    },

    getLatitude: function(){
      return MapHolder.map.center.k;
    },

    getLongitude: function(){
      return MapHolder.map.center.B;
    }
  }
})()


google.maps.event.addDomListener(window, 'load', MapController.enableMap);



//END OF PRODUCTION CODE
//----------------------------------------------

  // function initialize() {
  //   MapHolder.map = MapController.makeGoogleMap()

  //   var myOptions = {
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     zoom: 4,
  //     center: new google.maps.LatLng(37.1, -95.7),
  //     mapTypeControl: false,
  //     panControl: false,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       style: google.maps.ZoomControlStyle.SMALL
  //     },
  //     streetViewControl: false
  //   };

  //   var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions)

  //   var input = /** @type {HTMLInputElement} */(
  //     document.getElementById('pac-input'));

  //   searchBox = new google.maps.places.SearchBox(
  //   /** @type {HTMLInputElement} */(input));

  //   google.maps.event.addListener(searchBox, 'places_changed', function() {
  //     var places = searchBox.getPlaces();

  //     if (places.length == 0) {
  //       return;
  //     }
  //     for (var i = 0, marker; marker = markers[i]; i++) {
  //       marker.setMap(null);
  //     }

  //     // For each place, get the icon, place name, and location.
  //     var bounds = new google.maps.LatLngBounds();
  //     for (var i = 0, place; place = places[i]; i++) {

  //       // Create a marker for each place.
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         title: place.name,
  //         position: place.geometry.location
  //       });

  //       markers.push(marker);

  //       bounds.extend(place.geometry.location);
  //     }

  //     map.fitBounds(bounds);

  //   });

  //   google.maps.event.addListener(map, 'bounds_changed', function() {
  //     var bounds = map.getBounds();
  //     searchBox.setBounds(bounds);

  //   });

  // };

