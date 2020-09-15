const router = require('express').Router();
const login = require('./login/login.routes');
const api = require('./api');
const jwt = require('express-jwt');

router.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}), api);
router.use('/login', login);

module.exports = router;