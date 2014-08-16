module.exports = (function() {
	return {

		// GET /media/images
		images: require('./images'),

		// GET /media/text
		text: 	require('./text')
	}
})();