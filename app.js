const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres');
const home = require('./routes/home');
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
const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});
