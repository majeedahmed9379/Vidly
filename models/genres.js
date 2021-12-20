const mongoose = require ('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name:{type:String, required:true},
    date:{type:Date, default:Date.now}
});
const Genre = mongoose.model('Genre',genreSchema);

function validate(genre){
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    const {error} = schema.validate(genre);
    return error;
}
exports.Genre = Genre;
exports.validate = validate;