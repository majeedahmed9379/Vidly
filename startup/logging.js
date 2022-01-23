require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");
module.exports = () => {
    // winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.Console({colorize:true,prettyPrint:true}));
    // winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/VIDLY' }));
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'logfile.log',humanReadableUnhandledException:true,level:"error" }),
        new winston.transports.Console({colorize:true,humanReadableUnhandledException:true,level:"error"}));
   
    process.on("unhandledRejection", (err) => {
        throw err;
    })
}
