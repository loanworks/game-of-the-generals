var express = require('express');
var router = express.Router();

router.get('/get-user-info',function(req, res){
	//res.render('login/index',{title:'Signin',prevError:req.session.errorMsg});	
	res.send({username:req.session.user.username,email:req.session.user.email});
	
});

module.exports = router;