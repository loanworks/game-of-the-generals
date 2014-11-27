var home = Backbone.View.extend({	
	render : function(){
		var fs = require('fs');
		var markup = fs.readFileSync('../views/index/home.ejs');
		console.log(markup);
		this.$el.html(markup);
		return this;
	}
});

