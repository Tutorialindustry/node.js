var tls = require('tls');
var fs = require('fs');
var https = require('https');

var options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem'),
  rejectUnauthorized:false
};



/*
* Using https module
*/
https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);

/*
* Using tls module
*/
var tls = require('tls');

tls.createServer(options, function (cleartextStream) {
   cleartextStream.write("welcome!\n");
   cleartextStream.setEncoding('utf8');
   cleartextStream.end();
}).listen(8080);