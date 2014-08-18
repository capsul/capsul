var compress 	= require('koa-compress'),
		logger 		= require('koa-logger'),
		serve 		= require('koa-static'),
		route 		= require('koa-route'),
		cors 			= require('koa-cors'),
		koa 			= require('koa'),
		dotenv    = require('dotenv'),
		path 			= require('path'),
		util      = require('util'),
		async     = require('async'),
		request   = require('request'),
		config    = require('./config'),
		app 		  = koa();

// Including CORS for cross-origin request access
app.use(cors());

// Load local environment variables
dotenv.load();

// Include Capsul Controllers
var controllers = require('./controllers');

// Include Capsul API Routes
require('./routes')(app, route, controllers);

// Listen on local/heroku server port
app.listen(config.server.port, function() {
  console.log("Koa server listening on port " + 
  config.server.port + 
  "...");
});