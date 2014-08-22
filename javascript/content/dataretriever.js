$(document).ready(initialize)

function initialize() {
  $("#button").click(DataRetriever.requestData);
}

var DataRetriever = (function(){

  function constructURL(){
    var base = 'http://api-capsul-new.herokuapp.com/users/1/media?'
    var lat = getLatitude();
    var lng = getLongitude();
    var time = getTime();

    var url = base + lat + lng + time;
    return url;
  }

  function getTime(){
    var date = document.querySelector('[type=date]').value;
    var unixTimestamp = new Date(date).getTime();
    var timestamp = String(unixTimestamp).substr(0,10);
    var offsetTime = new Date(date).getTimezoneOffset() * 60 + 43200
    var adjustedTime = Number(timestamp) + offsetTime;
    var time = "time=" + adjustedTime
    return time
  }

  function getLatitude(){
    var latNumber = Number(MapController.getLatitude()).toPrecision(8);
    var lat = "lat=" + latNumber + "&";
    return lat
  }

  function getLongitude(){
    var lngNumber = Number(MapController.getLongitude()).toPrecision(8);
    var lng = "lng=" + lngNumber + "&";
    return lng
  }

  function AjaxRequest(url,callback){
    var request = $.ajax({
      url:url
    })
    request.done(callback);
  }

  return {
    requestData: function(){
      var url = constructURL();
      AjaxRequest(url, DataConverter.convertData)
    }
  }
})()