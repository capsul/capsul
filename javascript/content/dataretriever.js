$(document).ready(initialize)

function initialize() {
  $("#button").click(DataRetriever.requestData);
}

var DataRetriever = (function(){

  function constructURL(){
      var base = 'http://api-capsul.herokuapp.com/users/1/media?'
      var latNumber = Number(MapController.getLatitude()).toPrecision(8);
      var lat = "lat=" + latNumber + "&";
      var lngNumber = Number(MapController.getLongitude()).toPrecision(8);
      var lng = "lng=" + lngNumber + "&";
      var date = document.querySelector('[type=date]').value;
      var unixTimestamp = "time=" + (new Date(date).getTime());
      var timestamp = unixTimestamp.substr(0,15);

      var url = base + lat + lng + timestamp;
      return url;
    }

  function AjaxRequest(url,callback){
    var request = $.ajax({
      url:url
    })
    request.done(callback);
  }

  function renderContent(ajaxResponse){
    var content = parseData(ajaxResponse)
    PictureController.preparePictures(content.images);
    TextController.prepareText(content.text);
  }

  function parseData(ajaxResponse){
    var contentHolder = {
      text: [],
      images: []
    }

    //flattens all arrays into one array
    var ajaxData = ajaxResponse.data.reduce(function(a, b) {
      return a.concat(b);
    });

    ajaxData.forEach(function(item){
      if (item.type === "text") {
        contentHolder.text.push(item);
      }
      else if (item.type === "image") {
        contentHolder.images.push(item);
      }
    })
    return contentHolder
  }

  return {
    requestData: function(){
      var url = constructURL();
      AjaxRequest(url,renderContent)
    }
  }
})()