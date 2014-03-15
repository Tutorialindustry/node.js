
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs=require('fs');
var PDFDocument = require('pdfkit');

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

app.get('/', function(req,res){
	doc = new PDFDocument;
	doc.fontSize(15);
	//Use "\n" for breaking 
	// Add Randam text to be added in our pdf
	lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.\n';
	lorem +='Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit.\n ';
	lorem +=' \n Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh.Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';
	doc.text(lorem);
	//Add a new page for benzier curve and is part of second page
	doc.addPage();
	doc.moveTo(100, 200) 
	.lineTo(100, 160) 
	.quadraticCurveTo(130, 200, 150, 120) 
	.bezierCurveTo(190, -40, 200, 200, 300, 150) 
	.lineTo(400, 90) 
	.stroke()
	//This creates our third  page
	doc.addPage();
	
	grad = doc.moveTo(200, 200).linearGradient(50, 0, 150, 100);
	grad.stop(0, 'green').stop(1, 'red');
	doc.rect(50, 0, 100, 100);
	doc.fill(grad);

	grad = doc.radialGradient(300, 50, 0, 300, 50, 50);
	grad.stop(0, 'orange', 0).stop(1, 'orange', 1)
	doc.circle(300, 50, 50);
	doc.fill(grad);
	//This creates our Fourth  page
	doc.addPage();
	doc.save()
		.moveTo(100, 150)
		.lineTo(100, 250)
		.lineTo(200, 250)
		.fill("#FF3300")
	doc.scale(0.6)
		.translate(470, -380)
		.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
		.fill('red', 'even-odd')
		.restore()
	//This creates our Fifth  page
	doc.addPage()
		.fillColor("blue")
		.text('Here is a link!', 100, 100)
		.link(100, 100, 160, 27, 'http://google.com/');
	doc.write("output.pdf");
	  res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<h2>Pdf is generated blease use below link to download<br/><br/></h2>');
	res.end("<a href='http://localhost:3000/download'>Download</a>");
	
});
app.get('/download', function(req, res){
	//Use the below to send file and promt user to save it to disk
	res.download('output.pdf');
	//Use the below to send file and browser will open and display the file
	//res.sendfile('output.pdf');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
