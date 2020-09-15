let movies;

function loadMovies(){
    movies = require('../data/movies.json');
}

function getmovies(){
    return movies
}

function getMovieById(id){
    return movies.filter(function(movie){
        return movie.id === id
    })
}

function addMovie(movie){
    movie.id = getNextId();
    movie.creaded = new Date();

    movies.push(movie)

    return movie;
}

function deleteMovie(id){
    let i = movies.length;

    while(i-- > 0){
        if(movies[i].id === id){
            movies.splice(i,1)

            break
        }
    }
}

function isMovieInCollection(movieName){
    return movies.map(movie => movie.name).filter(name => name === movieName).length > 0;
}

function getNextId(){
    return Math.max(...movies.map(movie => movie.id)) + 1;
}

function getUniqueCategories(){
    return movies.map(movie => movie.category).filter((category, i) => movies.indexOf(category) !== i);
}

module.exports = {
    loadMovies,
    getmovies,
    getMovieById,
    addMovie,
    deleteMovie,
    isMovieInCollection,
    getUniqueCategories
}

