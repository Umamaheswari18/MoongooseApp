var express = require('express');

var fs=require('fs');
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var querystring=require('querystring');
var router = express.Router();
//var app = express();

var appData=require('../app.js');

// var MongoClient=require('mongodb').MongoClient;
// var url='mongodb://localhost:27017/movieDatabase';

//app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
//  console.log('Cookies: ', req.cookies);
});



//Reading the JSON File
router.get('/getJSON',function(req,res)
{
  console.log("inside get json");
  var content=[];
  var db=appData.db;

  db.on("error",console.error.bind(console,"Connection Error:"));

  db.open('open',function()
  {
      appData.User.find({},function(err,data){
      res.json(data);
    });
  });


});




module.exports = router;
