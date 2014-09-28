
var DataRetriever = (function(){

  function dateGMTNoonUTC() {
    var date = document.querySelector('[type=date]').value;
    return (+new Date(date + " 12:00:00 GMT+0000")) / 1000
  }

  function constructURL(lat, lng, timestamp){
    var baseString  = "http://api-capsul.herokuapp.com/users/1/media?"
    var latString   = "lat=" + lat + "&"
    var lngString   = "lng=" + lng + "&"
    var timeString  = "time=" + timestamp
    return baseString + latString + lngString + timeString
  }

  function TimezoneAjaxRequest(lat, lng, dateGMT){
    var request = $.ajax({
      url:      "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=" + dateGMT + "&key=AIzaSyCwoBQLdXCBaGaZ-JUj4efqMvlmhoerIAs", 
      get:      "GET",
      dataType: "json",
      timeout:  5000,
    })
    request.done(function(ajaxResponse) {
      if (ajaxResponse.status === "OK") {
        var localizedUTC = dateGMT - (ajaxResponse.dstOffset + ajaxResponse.rawOffset)
        var url = constructURL(lat, lng, localizedUTC)
      } else {
        var url = constructURL(lat, lng, dateGMT)
        console.log("timezone api returned null, falling back to GMT timestamp: ", url)
      }
      CapsulAjaxRequest(url, DataConverter.convertData)
    })
    request.fail(function(ajaxResponse) {
      var url = constructURL(lat, lng, dateGMT)
      console.log("timezone api fail, falling back to GMT timestamp: ", url)
      CapsulAjaxRequest(url, DataConverter.convertData)
    })
  }

  function CapsulAjaxRequest(url, callback){
    console.log("request sent to capsul api: ", url)
    capsulController.submitButtonLoading()
    var request = $.ajax({
      url:        url,
      type:       "GET",
      dataType:   "json",
      timeout:    30000
    })
    request.done(function(ajaxResponse) {
      console.log("capsul api response: ", request)
      callback(ajaxResponse)
    })
    request.fail(function(jqXHR, status) {
      capsulController.showErrorMessage()
      capsulController.submitButtonDefault()
    })
  }

  return {
    initialize: function() {
      $("#button").click(DataRetriever.requestData);
    },
    requestData: function(){
      var lat     = capsulMap.getLatitude()
      var lng     = capsulMap.getLongitude()
      var dateGMT = dateGMTNoonUTC()
      TimezoneAjaxRequest(lat, lng, dateGMT)
    }
  }

})()

$(document).ready(DataRetriever.initialize)
