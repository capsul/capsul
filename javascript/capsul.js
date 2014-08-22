
//Controller Below
var SlideshowController = (function(){

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
        textcolor: "#FFFFFF"
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

  return {

    prepareSlides: function(){
      var slideBundle = this.compileSlides(backgroundSlides.data);
      this.renderHTML(slideBundle.collection);
    },

    compileSlides: function(data){
      var slideBundle = new SlideBundle();
      data.forEach(function(slide){
        slideBundle.collection.push(new Slide(slide));
      })
      Slides.all.push(slideBundle);
      return slideBundle;
    },

    renderHTML: function(bundle){
      var self = this;
      bundle.forEach(function(slide) {
        slide.html = self.createHTML(slide);
        SlideView.render(slide.html, slide.link, slide.textcolor);
      })
    },

    createHTML: function(slide){
      // change #image-template to #slide-template
      var source = $('#slide-template').html();
      var template = Handlebars.compile(source);
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
  }
})(SlideView);

var controlBarController = (function() {
  return {
    slideUp: function() {
      var self = this;

      $("#button").click(function() {
        $("#cb-wrapper").animate({top:"0%"}, "slow");

        $("#slideshow").fadeOut( 750, function() {
          $( this ).remove()
        });
        $("#map-canvas").css("visibility", "visible");
        $("#map-canvas").animate({opacity: "1"}, "slow");

        $(document).on('DOMMouseScroll mousewheel', self.handleMap)
        })
    },

    handleMap: function(event){
      if (event.originalEvent.detail > event.originalEvent.wheelDelta) {
        $("#map-canvas").fadeOut(750,function(){
          $(this).attr('visibility','hidden')
        });
      }
      else if (event.originalEvent.detail < event.originalEvent.wheelDelta) {
        $("#map-canvas").fadeIn(750, function(){
          $(this).attr('visibility', 'visible')
        });
      }
    }
  }
})()

//View Below
var SlideView = (function(){
  return {
    render: function(slideHTML, slideBgImage, slideTextColor){
      $('#slideshow').append(slideHTML);
      $('#slideshow .slide').last().css({
       'background-image' : 'url('+slideBgImage+')',
       'opacity' : '1',
       'color' : slideTextColor
       });
    }
  }
})()

//Models & Model Holders Below

//holds all images from every API call ever made
var Slides = (function() {
  return {
    all: []
  }
})()

//holds all images from a single API call
function SlideBundle() {
  this.collection = [];
}

// Model for single image
function Slide(slide) {
  this.createdAt = slide.createdAt,
  this.link = slide.link,
  this.author = slide.author,
  this.placename = slide.placename,
  this.caption = slide.caption,
  this.hashtags = slide.hashtags,
  this.textcolor = slide.textcolor
};


$(document).ready(SlideshowController.prepareSlides.bind(SlideshowController)
  )

$(document).ready(controlBarController.slideUp.bind(controlBarController))

