exports.create = function(req, res){
  nano.db.create(req.body.dbname,function() {
	// create a new database
     if (err) {
        res.send("Error creating Database "+req.body.dbname);
        return;
      }
	res.send("Database "+req.body.dbname+"was created sucessfully");	
    });
  
};