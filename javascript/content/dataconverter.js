var DataConverter = (function(){

  var content = []
  var locations = []

  function pushLocation(latitude, longitude) {
    if (!isNaN(latitude) && !isNaN(longitude))
      locations.push({lat: latitude, lng: longitude})
  }

  function pushTextContent(textItem) {
    content.push(new TextArticle(textItem));
  }

  function pushImageContent(imageItem) {
    content.push(new Picture(imageItem));
  }

  return {
    convertData: function(ajaxResponse){
      ajaxResponse.data.forEach(function(item){
        if (item) {

          // parseFloat used below to account for inconsistent 
          // string vs. number lat/lng response from capsul api
          var granuleLat = parseFloat(item.location.latitude)
          var granuleLng = parseFloat(item.location.longitude)

          switch (item.type) {
            case "text" :
              pushTextContent(item)
              pushLocation(granuleLat, granuleLng)
              break;
              
            case "image" :
              pushImageContent(item)
              pushLocation(granuleLat, granuleLng)
              break;
          }
        }
      })
      console.log("dataconverter output: ", content)
      capsulMap.clearPins()
      capsulMap.setPins(locations)
      $('html,body').animate({ scrollTop: 0 }, 'slow')
      Viewport.set(content)
      content = []
      locations = []
    }
  }
})()