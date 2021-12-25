const Joi = require('joi');
const mongoose = require ('mongoose');
const {Schema,Genre,validate} = require('./genres');

const MovieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:255
    },
    genre:{
        type:Schema,
        required:true     
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
    
});

const Movie = mongoose.model('Movies', MovieSchema);

exports.Movie = Movie;




//To post a movie copy paste this: 

/*
{
	"title":"Insidious Chapter 2",
	"genreId":"61bb61239fd33a9c0ef7c859",
	"numberInStock":20,
	"dailyRentalRate":12
}
*/