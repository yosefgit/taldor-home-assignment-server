const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const movieService = require('./service/movies.service');
require('express-async-errors')
const app = express();

dotenv.config();
movieService.loadMovies();

app.use(cors());
app.use(bodyParser.json())

app.use(require('./routes'))

app.use(function(req, res, next){
    res.status(404).send("404: Not Found")
})

app.use(function(err, req, res, next) {
    console.log(err.message);

    if(err.name === 'UnauthorizedError'){
        res.status(401).send('invalid token')
    }

    res.status(err.status || 500);
    res.json(err)
})

app.listen(process.env.PORT, err => {
    if(err){
        console.log(err)
        process.exit(1);
    }

    console.log(`server listening on port ${process.env.PORT}`)
})