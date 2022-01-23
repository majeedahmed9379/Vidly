const mongoose = require('mongoose');
const winston = require('winston');
module.exports=()=>{
    mongoose.connect('mongodb://localhost/VIDLY',)
    .then(()=>winston.log({level:"info",message: "Connected to database successfully"}));

}