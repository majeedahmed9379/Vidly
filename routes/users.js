const Joi = require('joi');
const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const {auth} = require('../middelware/auth');
console.log(User);

router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);

})


router.post('/',async(req,res)=>{
    
    const err = validate(req.body);

    if(err) return res.status(400).send("Invalid user parameters");

    const duplicateCheck = await User.findOne({email:req.body.email});

    if(duplicateCheck) return res.status(400).send("User already exists");

    const setUser = new User(_.pick(req.body,['name','email','password','isAdmin'])
    );

    const salt = await bcrypt.genSalt(10);
    setUser.password = await bcrypt.hash(setUser.password,salt);
    
    await setUser.save();

    const token = setUser.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(setUser,['_id','name','email','isAdmin']));
});

router.get('/',async(req,res)=>{
    const allUsers = await User.find();
   res.send(allUsers);
});

module.exports = router;







function validate(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email:Joi.string().email().max(255).required(),
        password:Joi.string().min(4).max(255).required(),
        isAdmin:Joi.boolean()
    });
    const {error} = schema.validate(user);
    return error;
}