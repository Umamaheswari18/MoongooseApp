var mongoose=require('mongoose');


var UserSchema=mongoose.Schema({
  Title:String,
  Year:Number,
  Actors:String,
  Director:String,
  Released:String,
  Plot:String,
  imdbRating:Number,
  Awards:String,
  Poster:String
});




module.exports.UserSchema=UserSchema;
