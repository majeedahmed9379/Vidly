const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
app.use(helmet());
module.exports=(app)=>{
    
if (!config.get('jwtPrivateKey')) {
    throw new Error("Fatal error, Private key not defined");
}
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan enabled");
}
}