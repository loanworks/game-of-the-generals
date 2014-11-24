(function(){
	var piece = Backbone.Model.extend({
		defaults:function(){
			return {
				img:"",
				width:"30px",
				height:"30px",
				name:"",
				position:""
			};
		}
	});
	var pieces = Backbone.Collection.extend({
		model:piece
	});
	
})();