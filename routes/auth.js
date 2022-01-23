const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
console.log(User);
router.post('/',async(req,res)=>{
    
    const err = validate(req.body);

    if(err) return res.status(400).send("Invalid user parameters");

    const user = await User.findOne({email:req.body.email});

    if(!user) return res.status(200).send("Invalid Email or password");

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(200).send("Invalid Email or password");
    
    const token = jwt.sign({_id:user._id,name:user.name,isAdmin:user.isAdmin}, config.get("jwtPrivateKey"));
    res.send(token);


});

router.get('/',async(req,res)=>{
    const allUsers = await User.find();
   res.send(allUsers);
});

module.exports = router;







function validate(req){
    const schema = Joi.object({
        email:Joi.string().email().max(255).required(),
        password:Joi.string().min(4).max(255).required()
    });
    const {error} = schema.validate(req);
    return error;
}