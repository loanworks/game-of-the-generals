var express = require('express');
var router = express.Router();
// store session to redis
var redis = require("redis"),
  	client = redis.createClient(6379,'192.168.254.112');
var fs = require('fs');
var _ = require('lodash');
var js = fs.readFileSync('../public/javascripts/main.js')

router.get('/javascripts/main.js', restrict, function(req, res) {
 	client.auth("angpoginggwapongpaulon");
  	client.sadd('users',req.session.user.username);
	client.set('user:'+req.session.user.username,JSON.stringify({email:req.session.user.email}));

  	var str = _.clone(js);
  	while(str.indexOf('<%= username %>') >= 0)
    	str = str.replace('<%= username %>', req.session.user.username);
  	res.send(str);
});

/* Functions */
function restrict(req, res, next) {
	//next();
	if (req.session.user) {
		next();
	} else {
		req.session.errorMsg = 'Access denied! Login first to enter the lobby.';
		res.redirect('login');
		//res.send('Access denied');
	}
}
module.exports = router;
