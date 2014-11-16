var express = require('express');
var router = express.Router();

/* Routers */
router.get('/', function(req, res) {
	var params = {
		title: 'HOME',
		username: (typeof req.session.user != "undefined")?req.session.user.username:"",
		email: (typeof req.session.user != "undefined")?req.session.user.email:""
	};
	res.render('index/index', params);  	
});


/* Execute */
module.exports = router;
