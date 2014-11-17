
// Slideshow manager
var SlideshowManager = (function(){

  // TODO: pull this data via ajax from server for dynamic images
  var backgroundSlides = {

    data: [
      { type: "image",
        createdAt: "08/17/2013 at 8:18pm",
        link: "images/background/texans.jpg",
        author: "@bertie",
        placename: "Houston",
        caption: "Go Texans!",
        hashtags: ["#reliant", "#stadium", "#texans"],
        textcolor: "#FFFFFF"
      },
      { type: "image",
        createdAt: "11/07/2010 at 10:48am",
        link: "images/background/taj_mahal.jpg",
        author: "@ellen",
        placename: "Agra",
        caption: "This place is so mysterious and awesome!",
        hashtags: ["#india", "#tajmahal", "#family", "#zen"],
        textcolor: "#444444"
      },
      { type: "image",
        createdAt: "04/12/2011 at 14:16pm",
        link: "images/background/paris.jpg",
        author: "@cutiepie",
        placename: "Paris",
        caption: "I fell in love with Paris. I could live here forever!",
        hashtags: ["#paris", "#loveit", "#eiffel"],
        textcolor: "#444444"
      },
      { type: "image",
        createdAt: "01/01/2008 at 00:01am",
        link: "images/background/new_york.jpg",
        author: "@lover",
        placename: "New York",
        caption: "With my love at Times Square. Happy New Year everyone",
        hashtags: ["#newyork", "#timessquare", "#newyear"],
        textcolor: "#333333"
      },
      { type: "image",
        createdAt: "08/27/2012 at 11:24am",
        link: "images/background/burning_man.jpg",
        author: "@john",
        placename: "Black Rock Desert",
        caption: "Burning Man was the best experience of life. True Freedom!",
        hashtags: ["#freedom", "#burningman", "#music", "#fun"],
        textcolor: "#444444"
      },
    ]
  }

  var slides = []

  var Slide = function(slideData) {
    this.createdAt = slideData.createdAt,
    this.link = slideData.link,
    this.author = slideData.author,
    this.placename = slideData.placename,
    this.caption = slideData.caption,
    this.hashtags = slideData.hashtags,
    this.textcolor = slideData.textcolor
  }

  var compileSlides = function(data) {
    data.forEach(function(slideData){
      slides.push(new Slide(slideData));
    })
  }

  var createHTML = function(slide){
    var template = Handlebars.templates['slideshow']
    var info = {
      type: slide.type,
      createdAt: slide.createdAt,
      link: slide.link,
      author: slide.author,
      placename: slide.placename,
      caption: slide.caption,
      hashtags: slide.hashtags,
      textcolor: slide.textcolor
    };
    return template(info);
  }

  var renderHTML = function(bundle){
    slides.forEach(function(slide) {
      slide.html = createHTML(slide)
      $('#slideshow').append(slide.html)
      $('#slideshow .slide').last().css({
       'background-image' : 'url('+slide.link+')',
       'opacity' : '1',
       'color' : slide.textcolor
       })
    })
  }

  return {
    prepareSlides: function(){
      compileSlides(backgroundSlides.data)
      renderHTML(slides);
    }
  }

})();

// capsulController takes care of bar anim, map show hide on scroll or RO or for window resize
// that crosses responsive snap point (map hidden for mobile)
// also manages adjusting position of the granule viewer based on various factors

var capsulController = (function() {

  var controlsHeight
  var mapEnabled
  var mapWidthThreshold = 767
  var mapVisible = false
  var slideShowEnabled = true

  var showMap = function() {
    mapVisible = true
    $("#map-drawer").css("visibility", "visible")
    $("#map-drawer").animate({height: "250px",  opacity:"1"}, "slow")
    $("#granule-viewer").animate({top: controlsHeight + 250 + 62 + "px"}, "slow");
  }

  var hideMap = function(){
      mapVisible = false
      $("#map-drawer").animate({height:"0px", opacity:"0"}, "slow", function() { $("#map-drawer").css("visibility", "hidden") })
      $("#granule-viewer").animate({top: controlsHeight + 62 + "px"}, "slow");
  }

  var disableMap = function(){
      mapVisible = false
      $("#map-drawer").animate({height:"0px", opacity:"0"}, "slow", function() { $("#map-drawer").css("visibility", "hidden") })
      $("#granule-viewer").animate({top: 10 + "px"}, "slow");
  }

  var getControlsHeight = function() {
    return $("header").height() + $("#control-bar").height()
  }

  var getMapHeight = function() {
    return $("#map-drawer").height()
  }

  return {
    initialize: function() {
      
      controlsHeight = getControlsHeight()
      $( "#datepicker" ).datepicker({maxDate: 0})
      mapEnabled = ($(window).width() > mapWidthThreshold)

      $("#button").click(function() {

        if ( $("#datepicker").val() === "" || $("#pac-input").val() === "" ) return

        var dateFieldVal        = $( "#datepicker" ).datepicker("getDate")
        var formattedDateString = $.datepicker.formatDate( "yy-mm-dd", dateFieldVal)
        var lat                 = capsulMap.getLatitude()
        var lng                 = capsulMap.getLongitude()

        DataRetriever.requestData(formattedDateString, lat, lng)

        if (slideShowEnabled) {
          $("#cb-wrapper").animate({top: "0%"}, "slow")
          $("header").animate({marginBottom: "0"}, "slow")
          $("#slideshow").fadeOut( 750, function() {
            $( this ).remove()
          })
          slideShowEnabled = false
        } 
        // css setting below is for diabled fading background feature -- turned off cause it's ugly.
        // $('#granule-viewer').css("background-image", "none")
        capsulController.resetErrorMessage()

        if (mapEnabled && !mapVisible) showMap()
          
        $(document).on('DOMMouseScroll mousewheel', function(event) { 
          if (mapEnabled && mapVisible && (event.originalEvent.detail > event.originalEvent.wheelDelta)) {
            hideMap()
          } 
        })

        $("#control-bar").mouseenter(function() { if (mapEnabled && !mapVisible) showMap() })

        $(window).on("resize", function(e) {
          if (mapEnabled) capsulMap.triggerRedraw()
          var mapShouldShow = (e.target.innerWidth > mapWidthThreshold)
          if (controlsHeight !== getControlsHeight()) controlsHeight = getControlsHeight()
          if (mapShouldShow !== mapEnabled ) {
               mapEnabled = !mapEnabled
            if (mapEnabled) {
              $("#granule-viewer").css("top", controlsHeight + getMapHeight() + 62 + "px")
              showMap()
            } else {
              disableMap()
            }
          }
        })
      })
    },

    submitButtonLoading: function() {
      $("#button").css("background-image", "url('images/loading.gif')")
    },

    submitButtonDefault: function() {
      $("#button").css("background-image", "")
    },

    showErrorMessage: function() {
      $("#error-banner").css("display", "block")
    },

    resetErrorMessage: function() {
      $("#error-banner").css("display", "none")
    }

  }
})()

$(document).ready(function() {
  capsulController.initialize()
  capsulMap.initialize()
  SlideshowManager.prepareSlides()
})


