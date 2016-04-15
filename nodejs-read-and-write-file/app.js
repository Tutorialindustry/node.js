
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs=require('fs');
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
app.post('/readfile',function(req,res){
	 fs.readFile(req.body.file_name+'.txt', function (err, data) {
		if (err){
		    //Error of 34 is thrown if file doesn't exist
			if(err.errno==34){
				res.end('No such file exist');;
			}
			
		}else{
			res.end(data);
		}
	  
	}); 
	//The below is the synchronous version  of the above
	// It should be written in try catch to avoid any error
	/* 
	try{
		var data=fs.readFileSync(req.body.file_name+'.txt');
		res.end(data);
	}catch(e){
		res.end("No such file or directory");
	} 
	*/
});
app.post('/createfile',function(req,res){
	if(req.body.file_name !="" && req.body.file_data !=""){
		fs.writeFile(req.body.file_name+'.txt', req.body.file_data, function (err) {
		if (err){
			res.end('File could not be saved');
		}else{
			res.end('File has been saved');
		}
		});
	}else{
		res.end('Please provide file name and or content');
	} 
	//The below is the synchronous version  of the above
	// It should be written in try catch to avoid any error
	/* try{
		var data=fs.writeFileSync(req.body.file_name+'.txt');
		res.end("Data has been written sucessfully");
	}catch(e){
		res.end("Error occurred");
	}  */
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
