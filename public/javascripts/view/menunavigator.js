var menuNavigator = Backbone.View.extend({
	initialize:function(option){
		this.options = option;
	},
	render : function(){
		var markup = "";			
		if(typeof this.options.username != "undefined" && this.options.username != ""){ 
			markup = "Welcome <b>" +  this.options.username + "</b> <a href='/login/logout'>Logout</a>";
		}		
	
		this.$el.html(markup);
		return this;
	}
});

