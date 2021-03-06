const {Movie} =  require('../models/movies');

const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {Schema,Genre,genrevalidate} = require('../models/genres');
console.log("Genre in movies routes: ",Genre);
const express = require('express');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const router = express.Router();
//get all movies
router.get('/', async function(req, res) {
    const movies = await Movie.find().sort({name:1});
    res.send(movies);
  });

//Add a movie

router.post('/',async (req,res)=>{
    const {error} = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid Genre");

    const movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);

  });
//update a movie
router.put('/:id', async (req, res) => {
const { error } = Validate(req.body); 
if (error) return res.status(400).send(error.details[0].message);

const genre = await Genre.findById(req.body.genreId);
if (!genre) return res.status(400).send('Invalid genre.');

const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
    title: req.body.title,
    genre: {
        _id: genre._id,
        name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});

router.delete('/:id', async (req, res) => {
const movie = await Movie.findByIdAndRemove(req.params.id);

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});

router.get('/:id', async (req, res) => {
const movie = await Movie.findById(req.params.id);

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});

function Validate(movie){
    const schema=Joi.object({
        title:Joi.string().min(1).max(255).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    });
    console.log(schema.validate(movie));
    return schema.validate(movie);
}

module.exports = router; 