var capsulMap = (function() {

	var map, pacInput, mapContainer

  var mapOptions = {
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 4,
		center: new google.maps.LatLng(37.1, -95.7),
		mapTypeControl: false,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
	    style: google.maps.ZoomControlStyle.SMALL
	  },
	  streetViewControl: false
  }

	var pinLocations = []

	var granuleMarker = {
		url: "../images/dot.png",
	  size: new google.maps.Size(10, 10),
	  origin: new google.maps.Point(0,0),
	  anchor: new google.maps.Point(5, 5)
  }

  return {

  	initialize: function() {
  		pacInput = $("#pac-input")[0]
  		mapContainer = $("#map-canvas")[0]
		  map = new google.maps.Map(mapContainer, mapOptions)
  	}, 

  	setPins: function(locations) {},

  	clearPins: function() {},

  	triggerRedraw: function() {},

  	getLatitude: function() {
  		return 47.606209
  	},

  	getLongitude: function() {
  		return -122.33207
  	},

  	echoMap: function() {
  		return map
  	}


  }


})()


// google.maps.event.addDomListener(window, 'load', capsulMap.initialize)