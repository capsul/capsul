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
		markers = []
  }

  var updateMapPlaces = function() {
    
      clearMarkers()

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

        markers.push(marker)
      	center = place.geometry.location

        if (place.geometry.viewport) {
          bounds = place.geometry.viewport
        } else {

          var ur = new google.maps.LatLng(center.k - 1, center.B + 1)
          var ll = new google.maps.LatLng(center.k + 1, center.B - 1)

          bounds = new google.maps.LatLngBounds(ll, ur)
          console.log("fallback bounds are: ", bounds)
        }

        map.fitBounds(bounds)
        map.panTo(center)

      } else {

	      // For each place, get the icon, place name, and location.
	      for (var i = 0, place; place = places[i]; i++) {

	        // Create a marker for each place.
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location,
	          title: place.name
	        });

	        // Record markers so they can be addressed / removed later.
	        markers.push(marker);

	        // extend the map bounds to contain all markers.
	        bounds.extend(place.geometry.location);
          map.fitBounds(bounds)
          center = map.getCenter()
        }
      }


    }

  return {

  	initialize: function() {
  		mapContainer = $("#map-canvas")[0]
		  map = new google.maps.Map(mapContainer, mapOptions)
  		pacInput = $("#pac-input")[0]
  		pac = new google.maps.places.SearchBox(pacInput)
  		google.maps.event.addListener(pac, 'places_changed', updateMapPlaces)
	    google.maps.event.addListener(map, 'bounds_changed', function(){
        bounds = map.getBounds()
        center = map.getCenter()
	    })
	  },

  	setPins: function(locations) {
  		var pinBounds = new google.maps.LatLngBounds();

  		locations.forEach(function(location){
				var pin = new google.maps.Marker({
				  map: map,
				  position: location,
					icon: granuleMarker
				})
		    pins.push(pin)
		    pinBounds.extend(pin.getPosition())
  		})
      bounds = pinBounds
      map.fitBounds(bounds)
      center = map.getCenter()
      pinBounds = []
  	},

  	clearPins: function() {
	  	pins.forEach(function(pin) {pin.setMap(null)})
  		pins = []
  	},

  	triggerRedraw: function() {
  		google.maps.event.trigger(map, 'resize')
      map.panTo(center);
  	},

  	getLatitude: function() {
      return center.k
  	},

  	getLongitude: function() {
      // do this silly crap becasue google maps will return 
      // bonkers lng values if you pan the map a bunch.
      if (center.B < -180) {
        return center.B + 360
      } else if (center.B > 180) {
        return center.B - 360
      } else {
        return center.B
      }
    },

  }

})()

