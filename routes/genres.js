const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const {Genre,validate} = require('../models/genres');



router.get('/',async(req,res)=>{
     const genres = await Genre.find().sort({date:-1});
    res.send(genres);
    console.log("All genres displayed");
    
});
//Getting a specific genre by id or name
router.get('/:id',async(req,res)=>{
    const genres = await Genre.findById(req.params.id);
            
    if(!genres) return res.status(400).send("Genre not found");
    res.send(genres);     
});
//delete by name or id
router.delete('/:id',async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre);
        
    
});

// Creating a new genre by name 
router.post('/',async(req,res)=>{
    const error_in_genre_name_validate = validate(req.body);
    var genre={};
    if(!error_in_genre_name_validate){
        genre = new Genre({
            name:req.body.name,
            date: req.body.date 
        });
        await genre.save();   
        console.log("Added successfully: ",genre);
        res.send(genre);
    }
    else{
        res.status(400).send("Please enter a valid course name, Error: "+error_in_genre_name_validate.message);
    }
});

//Updating an existing genre: 
router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body.name);
    if(error) return res.status(400).send("Error in the specified name",error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},
        {new:true});
    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre);
    
});


module.exports = router;