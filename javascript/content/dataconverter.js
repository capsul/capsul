var DataConverter = (function(){

  var content = []
  var locations = []

  function pushLocation(latitude, longitude) {
    if (!isNaN(latitude) && !isNaN(longitude))
      locations.push({lat: latitude, lng: longitude})
  }

  function pushTextContent(textItem) {
    content.push([new TextArticle(textItem)]);
  }

  function pushImageContent(imageItem) {
    content.push([new Picture(imageItem)]);
  }

  var processResponse = function(ajaxResponse) {
    var rawGranules = ajaxResponse.data,
        lastWasTweet = false


    for ( var i = 0; i < rawGranules.length; i ++) {
      var rawGranule = rawGranules[i],
          granuleLat,
          granuleLng

      if (rawGranule) { // skip possible null values coming from capsul api
        // parsingFloat to account for inconsistent data types
        // string vs. number in lat/lng response from capsul api
        granuleLat = parseFloat(rawGranule.location.latitude)
        granuleLng = parseFloat(rawGranule.location.longitude)

        // set a unique key on each granule to keep React happy
        rawGranule.id = i

        // if we have an insta
        if (rawGranule.type === "image") {
          // if the last thing was a tweet, it's stored in the bundler
          // with any previous consecutive tweets so now it's time to get them
          if (lastWasTweet) {
            // bundler.generate will return a 2D array
            var bundles = bundler.generate()
            for (var j = 0; j < bundles.length; j ++) {
              content.push(bundles[j])
            }
          }
          // now push in the instagram
          pushLocation(granuleLat, granuleLng)
          content.push([new Picture(rawGranule)])
          lastWasTweet = false
        } else if (rawGranule.type === "text") {
          // if we have a tweet
          pushLocation(granuleLat, granuleLng)
          bundler.add(new TextArticle(rawGranule))
          lastWasTweet = true
        } else if (rawGranule.type === "video") {
          // TREATING INSTAGRAM VIDEO AS STATIC PHOTO FOR NOW
          // if the last thing was a tweet, it's stored in the bundler
          // with any previous consecutive tweets so now it's time to get them
          if (lastWasTweet) {
            // bundler.generate will return a 2D array
            var bundles = bundler.generate()
            for (var j = 0; j < bundles.length; j ++) {
              content.push(bundles[j])
            }
          }
          // now push in the instagram
          pushLocation(granuleLat, granuleLng)
          content.push([new Picture(rawGranule)])
          lastWasTweet = false
        } else {
          console.log("unkown granule type, skipping: ", rawGranule.type)
          lastWasTweet = false
        }
      }
    }

    // we might still have some tweets in the bundler...
    if (bundler.status()) {
      var bundles = bundler.generate()
      for (var k = 0; k < bundles.length; k ++) {
        content.push(bundles[k])
      }
    }
  }

  var bundler = (function() {
    var queue = [],
        bundleSize = 0,
        maxConsecutive = 3

    var reset = function() {
      queue = []
      bundleSize = 0
    }

    var enqueue = function(item) {
      queue.push(item)
    }

    var setBundleSize = function() {
      bundleSize = Math.floor(queue.length / maxConsecutive)
    }

    var generateBundles = function() {
      setBundleSize()
      var bundle = [],
          bundles = []


      // build all bundles but the last
      for (var i = 0; i < maxConsecutive-1; i ++) {
        for (var j = 0; j < bundleSize; j ++) {
          bundle.push(queue.shift())
        }
        bundles.push(bundle)
        bundle = []
      }
      
      // build the last and include any remainders
      var remaining = queue.length
      for (var k = 0; k < remaining; k ++) {
        bundle.push(queue.shift())
      }
      bundles.push(bundle)
      bundle = []

      reset()
      return bundles
    }

    var generateSingles = function() {
      var bundles = []

      for (var i = 0; i < queue.length; i ++) {
        bundles.push([queue[i]])
      }

      reset()
      return bundles
    }

    return {
      add: function(item) {

        enqueue(item)
      },
      generate: function() {
        if (queue.length > maxConsecutive) {
          return generateBundles()
        } else {
          return generateSingles()
        }
      },
      status: function() {
        return (queue.length > 0) ? true : false
      }
    }

  })();

  return {
    convertData: function(ajaxResponse){
      processResponse(ajaxResponse)
      capsulMap.clearPins()
      capsulMap.setPins(locations)
      $('html,body').animate({ scrollTop: 0 }, 'slow')
      Viewport.set(content)
      content = []
      locations = []
    }
  }

})()