module.exports = (function(){
	
	var twitterRequestDef = require('q').defer();

	return TwitterManager = {
		collectParams: function(url) {
			var helper = require("../../helpers");
			var params = helper.paramsForUrl(url);
			params.time = helper.unixToDate(params.time);
			return params
		},
		createInstance: function(searchInfo) {
			var Twitter = require('node-twitter');
			return new Twitter.SearchClient( 
				process.env.CONSUMER_KEY, 
				process.env.CONSUMER_SECRET, 
				process.env.ACCESS_TOKEN_KEY, 
				process.env.ACCESS_TOKEN_SECRET 
				);
		},
		locationForTweet: function(tweet) {
			try {
				return {
					"lat": tweet.geo.coordinates.shift(),
					"lon": tweet.geo.coordinates.shift()
				}
			} catch(e) {
				return {
					"lat": "", // TODO: Make current search coords
					"lon": ""  // TODO: Make current search coords
				}
			}
		},
		hashtagsForTweet: function(tweet) {
			try {
				return tweet.entities.hashtags.map(function(hashtag) {
					return hashtag.text;
				});
			} catch(e) {
				return [];
			}
		},
		granualFromTweet: function(tweet) {
			return granual = {
				type: 				"text",
				created_at: 	tweet.created_at,
				source: 			"twitter",
				language: 		tweet.lang,
				content: 			tweet.text,
				author:     	tweet.user.screen_name,
				location:   	this.locationForTweet(tweet),
				hashtags:   	this.hashtagsForTweet(tweet)
			}
		},
		granualsFromTwitterData: function(twitterData) {
			granuals = [];

			twitterData.forEach(function(tweet) {
				granuals.push(TwitterManager.granualFromTweet(tweet));
			}.bind(this));

			return granuals;
		},
		requestData: function (err, data) {
			twitterRequestDef.resolve(data.statuses);
		},
		search: function *(url) {
			var params = this.collectParams(url);
			var Twitter = this.createInstance();
			
			Twitter.search( { 
				'q': '',
				'geocode': params.lat + "," + params.lng + "," + "1mi", 
				'since_id': params.time,
				'result_type': 'recent',
				'count': 100,
				'include_entities': true }, 
				this.requestData)

			return twitterRequestDef.promise
			.then(this.granualsFromTwitterData);
		}
	};
})();