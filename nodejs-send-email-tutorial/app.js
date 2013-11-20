
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
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
app.get('/users', user.list);
app.post('/contact', function (req, res) {
    var mailOpts, smtpConfig;
	
    smtpConfig = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
		user: "enterUrGmailIdHere@gmail.com",
		pass: "EnterUrPasswordHere"
    }
    });
    //construct the email sending module
    mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;',
		to: 'enterUrGmailIdHere@gmail.com',
		subject: 'Website contact form',
		text: req.body.message
    };
	//send Email
    smtpConfig.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
       res.end("Email send Falied");
    }
    //email send sucessfully
    else {
     res.end("Email send sucessfully");
    }
    });
    });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
