module.exports = (function(){
	return InstagramManager = {
		collectParams: function(url) {
			return require("../../helpers")
			.paramsForUrl(url);
		},
		collectOptions: function(params) {
			return options = {
				url: 'https://api.instagram.com/v1/media/search?' + 
				'lat=' + params.lat +
				'&lng=' + params.lng +
				'&max_timestamp='+ params.time +
				'&distance=' + '500' +
				'&access_token=' + 
				process.env.INSTAGRAM_ACCESS_TOKEN,
				headers: { 'User-Agent': 'request' }
			}
		},
		locationForImage: function(image) {
			return {
				"latitude": image.location.latitude,
				"longitude": image.location.longitude
			}
		},
		imagesForImage: function(image) {
			return {
				"thumb": image.images.thumbnail.url,
				"low_res": image.images.low_resolution.url,
				"high_res": image.images.standard_resolution.url
			}
		},
		captionForImage: function(image) {
			try {
				return image.caption.text
			} catch(e) {
				return ""
			}
		},
		granularFromImages: function(image) {
			return granular = {
				type: 			image.type,
				created_at: image.created_at,
				service: 		'instagram',
				link:       image.link,
				author:     image.user.username,
				location:   this.locationForImage(image),
				images:     this.imagesForImage(image),
				caption:    this.captionForImage(image),
				hashtags:   image.tags
			}
		},
		granualsFromInstagramData: function(instagramData) {
			var granuals = [];
			instagramData.forEach(function(image) {
				granuals.push(this.granularFromImages(image));
			}.bind(this));
			return granuals;
		},
		search: function *(url) {
			var request = require('koa-request');

			var params = this.collectParams(url)
			var options = this.collectOptions(params);
			var response = yield request(options);
			var instagramData = JSON.parse(response.body).data
			return this.granualsFromInstagramData(instagramData)
		}
	}
})();