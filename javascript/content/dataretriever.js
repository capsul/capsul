 
var DataRetriever = (function(){

  function dateGMTNoonUTC(formattedDateString) {
    // var date = document.querySelector('[type=date]').value;
    // var date = $.datepicker.parseDate( "yy-mm-dd", unformattedDateString )
    var timestamp = (new Date(formattedDateString + "T12:00:00Z").getTime()) / 1000
    return timestamp
  }

  function constructURL(lat, lng, timestamp, utcOffset){
    var baseString  = "http://api-capsul.herokuapp.com/users/1/media?"
    var latString   = "lat=" + lat + "&"
    var lngString   = "lng=" + lng + "&"
    var timeString  = "time=" + timestamp + "&"
    var utcOffsetString = "utc_offset=" + utcOffset
    return baseString + latString + lngString + timeString + utcOffsetString
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
        var utcOffset = (ajaxResponse.dstOffset + ajaxResponse.rawOffset)
        var localizedUTC = dateGMT - utcOffset
        var url = constructURL(lat, lng, localizedUTC, utcOffset)
      } else {
        var utcOffset = 0
        var url = constructURL(lat, lng, dateGMT, utcOffset)
        console.log("timezone api returned null, falling back to GMT timestamp: ", url)
      }
      CapsulAjaxRequest(url, DataConverter.convertData)
    })
    request.fail(function(ajaxResponse) {
      var utcOffset = 0
      var url = constructURL(lat, lng, dateGMT, utcOffset)
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
    requestData: function(date, lat, lng){
      // var lat     = capsulMap.getLatitude()
      // var lng     = capsulMap.getLongitude()
      // var dateGMT = dateGMTNoonUTC(date)
      // TimezoneAjaxRequest(lat, lng, dateGMT)
      TimezoneAjaxRequest(lat, lng, dateGMTNoonUTC(date))
    }
  }

})()
