 (function(){   
     _.templateSettings = {
          interpolate: /\{\{(.+?)\}\}/g
     };     
     var userModel = Backbone.Model.extend({          
          urlRoot: "http://generals.vm:3000/api/get-user-info",
          defaults:function(){
               return {            
                    username:"test",
                    email:"test"            
               };
          }
     });
     /*var userCollection = Backbone.Collection.extend({
          model:userModel,
          url:'http://generals.vm:3000/api/get-user-info'
     });
     var user = new userCollection();*/
     var user = new userModel();
     //user.fetch();
     //var userAttr = user.attributes;
     //console.log(userAttr);

     var socket = io.connect('http://192.168.254.107:4000/lobby');     
     socket.on('connect',function(){
          user.fetch({
               success:function(){
                    socket.emit('join',{user:user.get('username')},function(data){                              
                         if(data.success){
                              //$("textarea[id=lobby-chat-users]").append(userAttr.username + "\r");
                         }
                    });       
               }
          });
          
          socket.on('update users list',function(data){
               console.log(data);
               $("textarea[id=lobby-chat-users]").html();
               for(var a=0; a<data.length; a++){
                    $("textarea[id=lobby-chat-users]").append(data[a] + "\r");
               }
          });
          //socket.emit('request users list',function(data){                 
          //     for(var a=0; a<data.length; a++){
          //          $("textarea[id=lobby-chat-users]").append(data[a] + "\r");
          //     }
          //});    
     });            
          
     
});       