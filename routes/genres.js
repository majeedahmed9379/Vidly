const Joi = require('joi');
const express = require('express');
const router = express.Router();

var genres = [
    {id:1, name:"Action"}, 
    {id:2, name:"Suspense"},
    {id:3, name:"Comedy"},
    {id:4, name:"Horror"}
]

router.get('/',(req,res)=>{
    res.status(200).send(genres );
});
//Getting a specific genre by id or name
router.get('/:idOrName',(req,res)=>{
    let to_send = genres.find((g)=> g.id === parseInt(req.params.idOrName));
    to_send==null ? to_send = genres.find((g)=> g.name.toLocaleLowerCase() === req.params.idOrName.toLocaleLowerCase()) : to_send;
    if(to_send != null){
        res.send(to_send);
    }
    else{
        res.status(404).send("Genre not found");
        return;
    }
});
//delete by name or id
router.delete('/:idOrName',(req,res)=>{
    let to_delete = genres.find((g)=> g.id === parseInt(req.params.idOrName));
    to_delete==null ? to_delete = genres.find((g)=> g.name.toLocaleLowerCase() === req.params.idOrName.toLocaleLowerCase()) : to_delete;
    if(to_delete != null){
        genres.splice(to_delete.id-1,1)
        res.send(to_delete);
    }
    else{
        res.status(404).send("Genre not found");
    }
});

// Creating a new genre by name 
router.post('/',(req,res)=>{
    const error_in_genre_name_validate = validate(req.body);
    if(!error_in_genre_name_validate){
        const new_genre = {
            id:genres.length+1,
            name:req.body.name
        }
        genres.push(new_genre);
        res.send(new_genre);
        return;
    }
    else{
        res.status(400).send("Please enter a valid course name, Error: "+error_in_genre_name_validate.message);
    }
});

//Updating an existing genre: 
router.put('/:Name',(req,res)=>{
    const to_update = genres.findIndex((g)=> g.name.toLocaleLowerCase() === req.params.Name.toLocaleLowerCase());
    console.log(to_update);
    if(to_update != -1){
        const error_in_genre_name_validate = validate(req.body);
        if(!error_in_genre_name_validate){
            genres[to_update].name = req.body.name;
            
            res.send(genres[to_update]);
            return;
        }
        else{
            res.status(400).send("Please enter a valid course name, Error: "+error_in_genre_name_validate.message);
        }
    }
    else{
        res.status(404).send("Genre not found");
        return;
    }



});

function validate(genre){
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    const {error} = schema.validate(genre);
    return error;
}
module.exports = router;