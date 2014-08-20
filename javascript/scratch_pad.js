
//Controller Below
var SlideshowController = (function(){

  var backgroundSlides = {
    data: [
      { type: "image",
        createdAt: "04/25/2013 at 4:35pm",
        link: "images/bg_05.jpg",
        author: "@schmee",
        placename: "San Francisco",
        caption: "Things white people like. And then there's an Asian in the middle.",
        hashtags: ["#innapropriate", "#letsbereal", "#idratherhavecake"],
        textcolor: "#FFFFFF"
      },
      { type: "image",
        createdAt: "06/13/1973 at 3:20pm",
        link: "images/bg_06.jpg",
        author: "@grampie",
        placename: "Paris",
        caption: "Happy Birthday to this George Clooney Doppelganger",
        hashtags: ["#astarisborn", "#tbt", "#timeforcake"],
        textcolor: "#444444"
      },
      { type: "image",
        createdAt: "12/25/2075 at Noon",
        link: "images/bg_09.jpg",
        author: "@bertie",
        placename: "Washington DC",
        caption: "Things asians people like. And day clubs after they were cool.",
        hashtags: ["#yourpeople", "#mypeople", "#youdoyou"],
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
        console.log('this is the slide text color inside the renderHTML function')
        console.log(slide.textcolor);
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
  return{
    slideUp: function() {
      $("#button").click(function(){
              $("#cb-wrapper").animate({
                    top:"0%"
                  }, "slow");
              $("#slideshow").animate({
                opacity:"0"
              }, "slow");
              $("#map-canvas").animate({
                    opacity: "1"
                  }, "slow");
        });

    },
    scrollImages: function(event) {
      var fromTop = $(window).scrollTop(),
      url = null
      if (fromTop < 4000) {
        url = 'images/sunrise.jpg';
      } else if (fromTop < 6000 ){
        url = 'images/cloudsaves.png';
      }
      else {
        url="images/night.jpg";
      }
      $('#content-container').css('background', 'url(' + url + ')');
      }
    }
}) ()

//View Below
var SlideView = (function(){
  return {
    render: function(slideHTML, slideBgImage, slideTextColor){
      console.log('this is the slide text color')
      console.log(slideTextColor);
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

$(document).ready(function(){
  controlBarController.slideUp();
  $(window).scroll(controlBarController.scrollImages)
})
