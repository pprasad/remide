const express = require('express');
const httpClient=require('./RestClient.js');
const bodyParser = require("body-parser");
const session = require('express-session');
const {ExpressOIDC} = require('@okta/oidc-middleware');
const app = express();
var APP_URL=null;
var CLIENT_ID=null;
var CLIENT_SECRET=null;
if(process.env.IS_DEV){
	APP_URL="http://localhost/authorization-code/callback";
	CLIENT_ID='0oaeyzvootzRktGA50h7';
	CLIENT_SECRET='6RAmfiN-vTfiO109hvLcyiUlDDwu_eNCKsE2qY2n';
}else{
	APP_URL="https://opencase.herokuapp.com/authorization-code/callback";
	CLIENT_ID='0oaf0980se5Ng7stv0h7';
	CLIENT_SECRET='hqFLQhqZmTz1FJkseLyzqQBnKa60NApq2N5dC7vN';
}
//session support is required to use ExpressOIDC
app.use(session({
secret: 'this should be secure',
resave: true,
saveUninitialized: false
}));
var isAuth=function(req,res,next){
	if(req.userinfo){
		return next();
	}else{
		res.status(401);
		return next();
	}
}
const oidc = new ExpressOIDC({
	  issuer: 'https://dev-268066-admin.oktapreview.com/oauth2/default',
	  client_id:CLIENT_ID,
	  client_secret:CLIENT_SECRET,
	  redirect_uri:APP_URL,
	  routes: {
		    callback: { defaultRedirect: "/#/dashboard" }
	  },
	  scope: 'openid profile'
});
app.use(oidc.router);
// Serve only the static files form the dist directory
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post("/api/create_tickets",isAuth,function(req,res){
    var URL="api/v2/tickets";
    var rquest=httpClient.get(URL,'POST',null,function(response){
       res.send(response);
       res.end();
    })
    rquest.write(JSON.stringify(req.body));
    rquest.end();
});
app.get("/api/viewtickets",isAuth,function(req,res){
   var URL="api/v2/tickets?order_type=asc";
   var request=httpClient.get(URL,'GET',null,function(response){
        res.send(response);
        res.end();
   }); 
   request.end();
});
app.get("/api/user",function(req,res){
	res.send(req.userinfo);
});
// Start the app by listening on the default Heroku port
oidc.on('ready',function(){
	app.listen(process.env.PORT || 80);
});