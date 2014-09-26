var capsulMap = (function() {

	var mapContainer, map, pacInput, pac, bounds, pins = [], markers = []

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

  var center = mapOptions.center

	var granuleMarker = {
		url: "images/dot.png",
	  size: new google.maps.Size(10, 10),
	  origin: new google.maps.Point(0,0),
	  anchor: new google.maps.Point(5, 5)
  }

  var clearMarkers = function() {
  	markers.forEach(function(marker) {marker.setMap(null)})
  }

  var updateMapPlaces = function() {
  		clearMarkers()
  		markers = []

      var places = pac.getPlaces();

      if (places.length === 0) {

        return;

      } else if (places.length === 1) {

      	var place = places[0];
      	var marker = new google.maps.Marker({
      		map: map,
      		title: place.name,
      		position: place.geometry.location
      	});

      	bounds = place.geometry.viewport;
        markers.push(marker);

      } else {

	      // For each place, get the icon, place name, and location.
	      bounds = new google.maps.LatLngBounds();
	      for (var i = 0, place; place = places[i]; i++) {

	        // Create a marker for each place.
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location,
	          title: place.name
	        });

	        // Record markers so they can be addressed / removed later.
	        markers.push(marker);
	        // console.log(markers)

	        // extend the map bounds to contain all markers.
	        bounds.extend(place.geometry.location);
	      }
	    }

      map.fitBounds(bounds)
      center = map.getCenter()


    }

  return {

  	initialize: function() {
  		mapContainer = $("#map-canvas")[0]
		  map = new google.maps.Map(mapContainer, mapOptions)
  		pacInput = $("#pac-input")[0]
  		pac = new google.maps.places.SearchBox(pacInput)
  		google.maps.event.addListener(pac, 'places_changed', updateMapPlaces)
	    google.maps.event.addListener(map, 'bounds_changed', function(){
	    	center = map.getCenter()
	    })
	  },

  	setPins: function(locations) {},

  	clearPins: function() {},

  	triggerRedraw: function() {
  		google.maps.event.trigger(map, 'resize')
      map.panTo(center);
  	},

  	getLatitude: function() {
  		return center.k
  	},

  	getLongitude: function() {
  		return center.B
  	},

  	echoMap: function() {
  		return map
  	}


  }


})()


// google.maps.event.addDomListener(window, 'load', capsulMap.initialize)