const router = require('express').Router();
const movieRoutes = require('./movie.routs');

router.use('/', movieRoutes);

module.exports = router;