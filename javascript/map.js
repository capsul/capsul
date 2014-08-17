  var map, searchBox;
  var markers = [];
  var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker.png';

  function initialize() {

    var myOptions = {
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
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

    var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

    searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);

    });

    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
      console.log("bounds changed");
      console.log(map.getCenter());
      console.log(map.getZoom());
      console.log(map.getBounds());
    });

  };


google.maps.event.addDomListener(window, 'load', initialize);