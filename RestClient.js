var http = require("https");
var extServerOptions = {
		host: 'mysupportindia.freshdesk.com',
	    path:'/',
	    method:null,
	    headers: {
	    	'Authorization':'Basic eEZzUzc4Q0hmTkJ0bUk4R3Q4Wmc6WA==',
	    	'Content-Type':'application/json'
	    }
};
module.exports = {
   path:function(){
	  return '/';  
   },		
   get:function(path,method,request,callback){
	   extServerOptions.method=method;
	   extServerOptions.path=this.path()+path;
	   console.info(extServerOptions.path);
	   return http.request(extServerOptions,function(response) {
	    	console.log("response statusCode: ", response.statusCode);
	    	var body='';
	    	response.on('data',function (data) {
	    		body+=data;
	    	})
	    	response.on('end', function () {
	    		callback(body);
	        });
	    });
   }				
}