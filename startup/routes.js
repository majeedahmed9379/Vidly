const genres = require('../routes/genres');
const customers = require('../routes/customers');
const home = require('../routes/home');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require ('../routes/auth');
const error = require("../middelware/error");

module.exports = (app) => {
    app.use('/vidly.com', home);
    //Handling genres related requests
    app.use('/vidly.com/api/genres', genres)

    app.use('/vidly.com/api/customers', customers);
    app.use('/vidly.com/api/movies', movies);
    app.use('/vidly.com/api/rentals', rentals);
    app.use('/vidly.com/api/users', users);
    app.use('/vidly.com/api/login', auth);
    app.use(error);
}