 
 (function(){
     _.templateSettings = {
          interpolate: /\{\{(.+?)\}\}/g
     };     
     var userModel = Backbone.Model.extend({
          Default:function(){
               return {
                    username:"",
                    email:""
               };
          }
     });
     var v_username = '<%= username %>';
     console.log(v_username);
     var socket = io.connect('http://192.168.254.107:4000/lobby');
     //var client_id;
     socket.on('connect',function(){
          socket.emit('join',{user:'<%= username %>'},function(data){                              
        
               //var user = new userModel({username:'{{username}}',email:"{{username}}"});
               //console.log(user.get('username'));
          });  
          socket.emit('request users list',function(data){  
               //console.log(data); 
               for(var a=0; a<data.length; a++){
                    $("textarea[id=lobby-chat-users]").append(data[a] + "\r");
               }
          });                  
     });         
     
})(jQuery);       