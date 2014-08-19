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

google.maps.event.addDomListener(window, 'load', MapController.enableMap.bind(MapController));