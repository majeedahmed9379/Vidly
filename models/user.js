const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:50
        },
    email:{
        type:String,
        unique:true,
        required:true,
        min:5,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1024
    },
    isAdmin:Boolean
});


Schema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('user',Schema);
module.exports = {User};

/*
To post a user
{
	"name":"Abdul Majeed",
	"email":"am123@gmail.com",
	"password":"1234",
	"isAdmin": true
	
}
*/
