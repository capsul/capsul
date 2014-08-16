$(document).ready(function() {
  init();
});

function init() {
  ajax.request('http://api-capsul.herokuapp.com/text', ContentHandler.getTweets);
  ajax.request('http://api-capsul.herokuapp.com/images', ContentHandler.getImages);
  ajax.request('http://api-capsul.herokuapp.com/images', ContentHandler.renderContent);
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

var ContentHandler = (function() {
  var contents = [];

  return {
    getTweets: function(tweets) {
      tweets.statuses.forEach(function(tweet) {
        var source = $('#tweet-template').html();
        var template = Handlebars.compile(source);
        var info = {
          tweet: tweet.text,
          url: 'http://www.ideachampions.com/weblogs/twitter-logo-bird.gif'
        };
        var html = template(info);
        contents.push(html);
      })
    },

    getImages: function(images) {
      images.data.forEach(function(data) {
        var source = $('#image-template').html();
        var template = Handlebars.compile(source);
        var info = {
          url: data.images.standard_resolution.url,
          username: data.user.full_name
        }
        var html = template(info);
        contents.push(html);
      })
    },

    renderContent: function() {
      var scrambledContent = contents.shuffle();
      scrambledContent.forEach(function(item) {
        ContentView.render(item);
      });
    }
  }
})(ContentView);

var ContentView = (function() {
  return {
    render: function(item) {
        $('#content-container').append(item);
    }
  }
})();

//This is hacky but there is no shuffle method for arrays.
Array.prototype.shuffle = function() {
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
}


