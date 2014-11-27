var userInfoModel = Backbone.Model.extend({          
     urlRoot: "http://generals.vm:3000/api/get-user-info",
     defaults:function(){
          return {            
               username:"",
               email:""            
          };
     }
});