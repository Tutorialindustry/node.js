
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var redis = require("redis"),
        client = redis.createClient();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

/*
*  Error handling if we are unable to connect to redis
*/

/*
* Post request handler for add new key
*/
app.post('/new_key', function(req, res){
	/*
	* Error handling if we are unable to connect to redis
	*/
	client.on("error", function (err) {
		res.send("Error occurred");	
    });
    client.set(req.body.key, req.body.value, redis.print);
	
	res.send("Record has been added successfully");
});
/*
* Post request handler for get new key
*/
app.post('/get_key', function(req, res){
	client.on("error", function (err) {
		res.send("No such key exist");	
	});
	client.get(req.body.key, function(err, reply) {
	   res.send("The key value = "+reply.toString());
	});
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
