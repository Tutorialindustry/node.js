
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.mist = function(req, res) {
	res.render('index',{title: 'HelloExpress'});
};

