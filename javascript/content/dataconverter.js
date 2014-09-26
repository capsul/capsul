var DataConverter = (function(){

  return {
    convertData: function(ajaxResponse){
      console.log(ajaxResponse)

      var content = []
      var locations = []
      var granuleLat
      var granuleLng

      ajaxResponse.data.forEach(function(item){
        if (item) {
          granuleLat = parseFloat(item.location.latitude)
          granuleLng = parseFloat(item.location.longitude)
          if (!isNaN(granuleLat) && !isNaN(granuleLng)) {
            locations.push({
              lat: granuleLat,
              lng: granuleLng
            })
          }
          if (item.type === "text") {
            var text = new TextArticle(item);
            content.push(text);
          }
          else if (item.type === "image") {
            var picture = new Picture(item);
            content.push(picture)
          }
        }
      })
      console.log(content)
      capsulMap.setPins(locations)
      Viewport.set(content)
    }
  }
})()