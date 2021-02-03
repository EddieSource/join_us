//every express
var express = require("express"); 
var app = express(); 

var bodyParser = require("body-parser"); 

var mysql = require("mysql"); 

//set view
app.set("view engine", "ejs"); 
//put connection forward
//telpp the app to use it
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static(__dirname + "/public")); 

var connection = mysql.createConnection(
{
	host: 'localhost', 
	user: 'root', 
	database: 'join_us'
}
); 



// function would be only triggered whenver a incoming request is made to this path "/"
// req and res indicate rewquest and result: request is a giant info, sometimes we need to pull out

//request to read and see the res.render()
app.get("/", function(req, res){
; 
	connection.query("SELECT COUNT(*) AS total FROM users", function(err, results){
		if(err) throw err; 
		var total_user = results[0].total; 
		
		//put it inside the query function because we don't know who comes first
		res.render("home", {data: total_user}); 

		// res.send("We have " + total_user + " users in our db"); 
	}); 
}); 

//request to write and see the /register page if succeess
app.post("/register", function(req, res){
	var person = { 
		email: req.body.email
	}; 
	
	connection.query("INSERT INTO users SET ?", person, function(err, results){
		if(err) throw err; 
		// res.send("Thanks for joining our waitlist"); 
		console.log(results); 
		// status refresh
		res.redirect("/"); 
	})
}); 


//listening if thgere's any request: listens the url 
app.listen(3000, function() {
	console.log('App listening on port 3000!'); 
}); 


