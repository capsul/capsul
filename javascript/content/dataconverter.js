var DataConverter = (function(){

  return {
    convertData: function(ajaxResponse){
      var content = [];
      // var ajaxData = ajaxResponse.data.reduce(function(a, b) {
      //   return a.concat(b);
      // });

      ajaxResponse.data.forEach(function(item){
        if (item.type === "text") {
          var text = new TextArticle(item);
          content.push(text);
          //make react models here
        }
        else if (item.type === "image") {
          var picture = new Picture(item);
          content.push(picture)
        }
      })
      Viewport.set(content);
    }
  }
})()