var express = require('express');
var router = express.Router();

router.get('/', restrict, function(req, res) {
	// store session to redis
	var redis = require("redis"),
    	client = redis.createClient(6379,'192.168.254.112');
    
    client.auth("angpoginggwapongpaulon");
    client.sadd('users',req.session.user.username);
	client.set('user:'+req.session.user.username,JSON.stringify({email:req.session.user.email}));
	client.quit();

  	res.render('lobby/index', { title: 'LOBBY',username:req.session.user.username,email:req.session.user.email });
  	//res.render('lobby/index', { title: 'LOBBY',username:'test',email:'testemail' });
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
