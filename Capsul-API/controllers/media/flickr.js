module.exports = (function(){
	
	var flickrRequestDef = require('q').defer();

	return FlickrManager = {
		collectParams: function(url) {
			var helper = require("../../helpers");
			var params = helper.paramsForUrl(url);
			return params
		},
		createInstance: function() {
			return Flickr = {
				'request': require('flickrapi'),
				'options': {
          api_key: process.env.FLICKR_API_KEY,
          secret: process.env.FLICKR_SECRET
        }
      }
    },
   requestData: function (err, data) {
     flickrRequestDef.resolve(data.photos.photo);
   },
   imagesForImage: function(image) {
      return images = {
        "thumb": 'https://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'_t.jpg',
        "low_res": 'https://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'_n.jpg',
        "high_res": 'https://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'_z.jpg'
      }
    },
    granualFromImage: function(image) {
      return granual = {
        // TODO: change type back to 
        // image.type to get video content
        type:       'image',
        created_at: '',
        service:    'flickr',
        link:       '',
        author:     '',
        location:   '', // pass in params for serached location
        images:     this.imagesForImage(image),
        caption:    image.title,
        hashtags:   ''
      }
    },
   granualsFromFlickrData: function(flickrData) {
     granuals = [];
      flickrData.forEach(function(image) {
        granuals.push(FlickrManager.granualFromImage(image));
      });

      return granuals;
   },
    search: function (url) {
     var params = this.collectParams(url);
     var Flickr = this.createInstance();

     Flickr.request.tokenOnly(Flickr.options, 
                              function(err, flickr) {
      flickr.photos.search({ 
        'max_taken_date': params.time,
        'sort': 'date-taken-desc',
        'lat': params.lat,
        'lon': params.lng,
        'radius': .25,
        'radius_units': 'mi',
      }, FlickrManager.requestData)
    });

     return flickrRequestDef.promise
     .then(this.granualsFromFlickrData);
   },
 };
})();