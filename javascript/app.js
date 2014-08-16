$(document).ready(function() {
  init();
});

function init() {
  // ajax.request('http://api-capsul.herokuapp.com/text', Render.text);
  ajax.request('http://api-capsul.herokuapp.com/images', Render.images);
}

var ajax = (function() {
  return {
    request: function(url,callback){
     var request = $.ajax({
        url: url
      })
     request.done(callback);
    }
  }
})();

var Render = (function() {

  return {
    text: function(data) {
      data.statuses.forEach(function(tweet) {
        $('#tweets-container').append(tweet.text);
      })
    },
    images: function(images) {
      images.data.forEach(function(data) {
        // console.log(data.images.standard_resolution.url);
        // console.log(data.user.full_name);
        var source = $('#image-template').html();
        var template = Handlebars.compile(source);
        var info = {
          url: data.images.standard_resolution.url,
          username: data.user.full_name
        }
        var html = template(info)
        console.log(html)
        $('#tweets-container').append(html);
      })
    }
  }
})();