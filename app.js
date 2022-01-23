const express = require('express');
const app = express();
const winston = require("winston");
app.use(express.json());
require("./startup/logging")();
require("./startup/config")(app);
require("./startup/dbconnect")();
require('./startup/routes')(app);


const port = 3000;
app.listen(port, () => {
    winston.info({message:`Listening on port: ${port}`});
});
