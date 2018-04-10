const express = require('express');
const httpClient=require('./RestClient.js');
const bodyParser = require("body-parser")
const app = express();
// Serve only the static files form the dist directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/dist'));

app.post("/api/create_tickets",function(req,res){
    var URL="api/v2/tickets";
    var rquest=httpClient.get(URL,'POST',null,function(response){
       res.send(response);
       res.end();
    })
    rquest.write(JSON.stringify(req.body));
    rquest.end();
});
app.get("/api/viewtickets",function(req,res){
   var URL="api/v2/tickets?order_type=asc";
   var request=httpClient.get(URL,'GET',null,function(response){
        res.send(response);
        res.end();
   }); 
   request.end();
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 80);