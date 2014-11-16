var express = require('express');
var router = express.Router();


router.get('/', restrict, function(req, res) {
  res.render('lobby/index', { title: 'LOBBY',username:req.session.user.username,email:req.session.user.email });
});
/* Functions */
function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.errorMsg = 'Access denied! Login first to enter the lobby.';
		res.redirect('login');
		//res.send('Access denied');
	}
}
module.exports = router;
