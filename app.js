const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
mongoose.connect('mongodb://localhost/VIDLY')
    .then(()=>console.log("Connected to database successfully"))
    .catch((err)=>console.log(err.message));
app.use(helmet());


//Checking environment
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log("Morgan enabled");
}
app.use(express.json());

//home page
app.use('/vidly.com',home);
//Handling genres related requests
app.use('/vidly.com/api/genres',genres)
app.use('/vidly.com/api/customers',customers);
const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});
