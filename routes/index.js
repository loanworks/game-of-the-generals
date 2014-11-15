var express = require('express');
var router = express.Router();

/* Routers */
router.get('/', function(req, res) {
	res.render('index/index', { title: 'HOME' });  	
});
router.get('/lobby', restrict, function(req, res) {
	res.render('lobby/lobby', { title: 'LOBBY' });  	
});
router.get('/login',function(req, res){
	res.render('login/index',{title:'Signin',prevError:req.session.error});
	//res.send(req.session.error);
});

/* Functions */
function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
		//res.send('Access denied');
	}
}

function getAllUsers(req, res, next){


}

/* Execute */
module.exports = router;
