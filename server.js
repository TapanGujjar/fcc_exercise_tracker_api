
//Loading the project
require('dotenv').config()
var express = require('express');
var app = express();
var mongoClient=require("mongodb").MongoClient;
var bodyParser = require('body-parser');
var mongoose=require("mongoose");


//Importing controllers
var trackerApi=require(__dirname+"/apis/trackerApi.js");

//Import Model
var trackerModel=require(__dirname+'/models/trackerModel.js');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});




var mongoUrl='mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds032887.mlab.com:32887/fcc_usage';
console.log("mongurl="+mongoUrl);
// mongoClient.connect(mongoUrl,function(err,db){
  
  
  // });
  
  mongoose.connect(mongoUrl,function(err,db){
    if(err)
      throw err;
    
    trackerApi(app,db,trackerModel);
    var listener = app.listen(process.env.PORT, function () {
      console.log('Your app is listening on port ' + listener.address().port);
    });
  });