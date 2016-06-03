var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');
var path=require('path');

var router = express.Router();
var app = express();

var appData=require('../app.js');


app.use(cookieParser());

//Creating a new movie list
router.post('/add',function(request,response)
{

  console.log("in addM");
   var obj={};

       obj.Title=request.body.Title;
       obj.Year=request.body.Year;
       obj.Actors=request.body.Actors;
       obj.Director=request.body.Director;
       obj.Released=request.body.Released;
       obj.Plot=request.body.Plot;
       obj.imdbRating=request.body.Rating;
       obj.Awards=request.body.Awards;
       obj.Poster="images/" + request.body.imageurl;

      appData.db.open('open',function()
      {

        var post=new appData.User({Title:obj.Title,Year:obj.Year,Actors:obj.Actors,Director:obj.Director,Released:obj.Released,Plot:obj.Plot,imdbRating:obj.imdbRating,Awards:obj.Awards,Poster:obj.Poster});

        post.save(function(err)
        {
          if(err)
          {
            return err;
          }
          else {
            console.log("Saved");
          }
        });
      });
      response.redirect('/');

});

//Updating the Movie Details
router.post('/update',function(request,response)
{
      console.log("in update");
      var Title,updRating,updAwards,updPoster;

      Title=request.body.Title;
      updRating=request.body.updRating;
      updAwards=request.body.updAwards;
      updPoster="images/" + request.body.imageurl;

      appData.db.open('open',function()
      {
          console.log("Inside update")
          appData.User.where({Title:Title}).update({$set : {imdbRating:updRating,Awards:updAwards,Poster:updPoster}},function(err)
        {
          if(err) throw err;
        });
      });

      response.redirect('/');

});


//For Deleting the Details
router.post('/deletePage',function(request,response)
{
     console.log("Inside delete")
      var deleteTitle=request.body.Title;


      appData.db.open('open',function()
      {
        appData.User.findOneAndRemove({Title:deleteTitle},function(err)
        {
          if(err) throw err;
        })
      });

      response.redirect('/');

});

module.exports = router;
