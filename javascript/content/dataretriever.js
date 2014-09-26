$(document).ready(initialize)

function initialize() {
  $("#button").click(DataRetriever.requestData);
}

var DataRetriever = (function(){

  function constructURL(){
    var base = 'http://api-capsul.herokuapp.com/users/1/media?'
    var lat = getLatitude();
    var lng = getLongitude();
    var time = getTime();

    var url = base + lat + lng + time;
    return url;
  }

  function getTime(){
    var date = document.querySelector('[type=date]').value;
    console.log("this is what's in :", date)
    var unixTimestamp = new Date(date).getTime();
    var timestamp = String(unixTimestamp).substr(0,10);
    var offsetTime = new Date(date).getTimezoneOffset() * 60 + 43200
    var adjustedTime = Number(timestamp) + offsetTime;
    var time = "time=" + adjustedTime
    return time
  }

  function getLatitude(){
    var latNumber = Number(capsulMap.getLatitude()).toPrecision(8);
    var lat = "lat=" + latNumber + "&";
    return lat
  }

  function getLongitude(){
    var lngNumber = Number(capsulMap.getLongitude()).toPrecision(8);
    var lng = "lng=" + lngNumber + "&";
    return lng
  }

  function AjaxRequest(url,callback){
    console.log(url)
    capsulController.submitButtonLoading()
    var request = $.ajax({
      url:        url,
      type:       "GET",
      dataType:   "json",
      timeout:    30000
    })
    request.done(callback)
    request.fail(function(jqXHR, status) {
      capsulController.showErrorMessage()
      capsulController.submitButtonDefault()
    })
  }

  return {
    requestData: function(){
      var url = constructURL();
      AjaxRequest(url, DataConverter.convertData)
    }
  }
})()