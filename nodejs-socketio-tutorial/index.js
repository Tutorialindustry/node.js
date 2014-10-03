var app = require('express')();
var http = require('http').Server(app);
var socket_io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});



socket_io.on('connection', function(socket){
	console.log('user Connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		socket_io.emit('chat message', msg);
	});
	var i=0;
	setInterval(function(){
	 socket.broadcast.emit('customechat', "BD : "+(i++));
	},500)
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});