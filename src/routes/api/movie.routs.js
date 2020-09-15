const router = require('express').Router();
const movieService = require('../../service/movies.service');
const urlExist = require('url-exist');
const helper = require('../../helper/helper')

router.get('/movies', function(req, res, next){
    res.json(movieService.getmovies())
})

router.get('/movie/:id', function(req, res, next){
    const id = parseInt(req.params.id)
    res.json(movieService.getMovieById(id))
})

router.post('/movie', async function(req, res, next){
    const {name, category, imdb_link, poster_link } = req.body;
    const errors = [];

    if(name && category && imdb_link && poster_link){
        // validate name
        if(movieService.isMovieInCollection(name))
            errors.push("movie already exists in collection")
    
        if(name.length > 30)
            errors.push('name is too long')
            
        //validate imdb_link
        const isUrlAlive = await urlExist(imdb_link)

        if(!isUrlAlive)
            errors.push('movie link is not valid');

        if(!helper.isUrlUnderRequestedHost("imdb", imdb_link))
            errors.push('movie link must be an imdb link')

        // validate poster_link
        if(!helper.isUrlLinkToImage(poster_link))
            errors.push('poster link must link to poster')

    } else {
        errors.push("one or more fields missing")
    }

    if(errors.length > 0){
        res.status(422).json(errors)
    }  

    res.json(movieService.addMovie({name, category, imdb_link, poster_link}))
})

router.delete('/movie/:id', function(req, res, next){
    const id = parseInt(req.params.id);
    movieService.deleteMovie(id);

    res.sendStatus(200);
})

router.get('/categories', function(req, res, next){
    res.json(movieService.getUniqueCategories());
})

module.exports = router;