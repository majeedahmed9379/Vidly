const Joi = require('joi');
const mongoose = require ('mongoose');
const customerSchmea = new mongoose.Schema({
    name:{type:String, required:true, minlength:3,maxlength:100},
    isGold:{type:Boolean,default:false},
    phone:{type:Number,required:true, minlength:10,maxlength:15}
});
const Customer = mongoose.model('customer', customerSchmea);
function validate(name){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        phone:Joi.string().min(10).max(15).pattern(/^[0-9]+$/).required(),
        isGold:Joi.boolean()||null
    });
    const {error} = schema.validate(name);
    console.log(error);
    return error;
  
  }

module.exports={Customer,validate};