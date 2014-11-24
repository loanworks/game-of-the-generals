var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
	res.render('login/index',{title:'Signin',prevError:req.session.errorMsg});
	//res.send(req.session.error);
});
router.post('/auth', authenticateUser, function(req, res){
	res.redirect('/lobby'); 
});
router.get('/logout',function(req,res){
	var redis = require("redis"),
    	client = redis.createClient(6379,'192.168.254.112');
    
    client.auth("angpoginggwapongpaulon");
    client.srem('users',req.session.user.username);
	client.del('user:'+req.session.user.username,JSON.stringify({email:req.session.user.email}));
	client.quit();

	req.session.destroy();

	res.redirect('/login');
});

/* Functions */
function authenticateUser(req, res, next){		
	var username = req.body.username;
	var password = req.body.password;
	if(typeof username == "undefined" || typeof password == "undefined"){
		req.session.errorMsg = "Access denied! Username or Password is required.";
		res.redirect('/login');
	}else{
		if( username == "" || password == ""){
			req.session.errorMsg = "Access denied! Username or Password is required..";
			res.redirect('/login');
		} 
		// validate database
		var pg = require('pg'); 
		//or native libpq bindings
		//var pg = require('pg').native
		var conString = "postgres://postgres_user:password@localhost/generals";
		pg.connect(conString, function(err, client, done) {
			if(err) {
				req.session.errorMsg = "Access denied! Error fetching client from pool";
				res.redirect('/login');	
				//return console.error('error fetching client from pool', err);
			}
			client.query('SELECT * from users where username=$1 and password=$2',[username,password], function(err, result) {
				//call `done()` to release the client back to the pool
				done();

				if(err) {
					req.session.errorMsg = "Access denied! Error running queryl";
					res.redirect('/login');		
					//return console.error('error running query', err);
				}

				if(result.rows.length >0){
					req.session.user = {
						username:username,
						email:result.rows[0].email	
					};
					next();	
				}else{
					req.session.errorMsg = "Access denied! Invalid Username or Password";
					res.redirect('/login');	
				}	
				
				//console.log(result.rows);
				//output: 1
			});
		});
		//next();
	}
}

module.exports = router;
