$(document).ready(initialize)

function initialize() {
  $("#button").click(DataRetriever.requestData);
}

var DataRetriever = (function(){
  function constructURL(lat, lng, timestamp){
    var baseString  = "http://api-capsul.herokuapp.com/users/1/media?"
    var latString   = "lat=" + lat + "&"
    var lngString   = "lng=" + lng + "&"
    var timeString  = "time=" + timestamp
    return baseString + latString + lngString + timeString
  }

  // function getTime(){
  //   var date = document.querySelector('[type=date]').value;
  //   console.log("this is what's in :", date)
  //   var unixTimestamp = new Date(date).getTime();
  //   var timestamp = String(unixTimestamp).substr(0,10);
  //   var offsetTime = new Date(date).getTimezoneOffset() * 60 + 43200
  //   var adjustedTime = Number(timestamp) + offsetTime;
  //   var time = "time=" + adjustedTime
  //   return time
  // }

  // function getLatitude(){
  //   // var latNumber = Number(capsulMap.getLatitude()).toPrecision(8);
  //   var latNumber = Number(capsulMap.getLatitude());
  //   var lat = "lat=" + latNumber + "&";
  //   return lat
  // }

  // function getLongitude(){
  //   // var lngNumber = Number(capsulMap.getLongitude()).toPrecision(8);
  //   var lngNumber = Number(capsulMap.getLongitude());
  //   var lng = "lng=" + lngNumber + "&";
  //   return lng
  // }

  function CapsulAjaxRequest(url, callback){
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

  function TimezoneAjaxRequest(lat, lng, dateGMT){
    var request = $.ajax({
      url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + dateGMT + "&key=AIzaSyCwoBQLdXCBaGaZ-JUj4efqMvlmhoerIAs", 
      get: "GET",
      dataType: "json",
      timeout: 5000,
    })
    request.done(function(ajaxResponse) {
      var dstOffset = ajaxResponse.dstOffset
      var rawOffset = ajaxResponse.rawOffset
      var localizedUTC = dateGMT - (dstOffset + rawOffset)
      var url = constructURL(lat, lng, localizedUTC)
      CapsulAjaxRequest(url, DataConverter.convertData)
    })
    request.fail(function(ajaxResponse) {
      var url = constructURL(lat, lng, dateGMT)
      console.log("fallback timestamp url ", url)
      CapsulAjaxRequest(url, DataConverter.convertData)
    })
  }

  function dateGMTNoonUTC() {
    var date = document.querySelector('[type=date]').value;
    return (+new Date(date + " 12:00:00 GMT+0000")) / 1000
  }

  return {
    requestData: function(){
      var lat = capsulMap.getLatitude()
      var lng = capsulMap.getLongitude()
      var dateGMT = dateGMTNoonUTC()
      TimezoneAjaxRequest(lat, lng, dateGMT)
    },


  }
})()