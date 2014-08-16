module.exports = (function(){

	// GET /users/:id/media?lat=<LAT>&lng=<LNG>&time=<TIME>
	return function* collection(id) {
		var helper = require("../../helpers");

		var params = {};
		if (this.request.url) {
			params = helper.paramsForUrl(this.request.url);
		}
		params["id"] = id;

		ContentManager = {
			twitter: function(params) {
				var twitterResponse = {"test": "Wasnt set"};

				var twitter = require('twitter');
				var capsulTwitter = new twitter({
					consumer_key: process.env.CONSUMER_KEY,
					consumer_secret: process.env.CONSUMER_SECRET,
					access_token_key: process.env.ACCESS_TOKEN_KEY,
					access_token_secret: process.env.ACCESS_TOKEN_SECRET
				});
			    
		    capsulTwitter.search('filter', {
		    	'geocode': '37.778360,-122.389160,1mi',
		    	'since_id': '2014-05-08',
		    	'rpp': 100,
		    	'include_entities': true
		    }, cb.bind(this));
			}
		};

		function cb(data) {
    	console.log(data);
			// this.body = yield ContentManager.twitter(params).bind(this);
		}

		console.log("Envoking function.")
		this.body = yield ContentManager.twitter(params).bind(this);
	}
})();