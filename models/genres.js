const mongoose = require ('mongoose');
const Joi = require('joi');
const Schema = new mongoose.Schema({
    name:{type:String, required:true},
    date:{type:Date, default:Date.now}
});
const Genre = mongoose.model('Genre',Schema);

function validate(genre){
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    const {error} = schema.validate(genre);
    return error;
}

module.exports = {Schema,Genre,validate}
