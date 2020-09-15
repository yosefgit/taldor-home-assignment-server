const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', function(req, res, next){
    const { username, password } = req.body;
    const { ADMIN_USER, ADMIN_PASSWORD, SECRET } = process.env;

    if(username !== ADMIN_USER || password !== ADMIN_PASSWORD){
        res.status(401).send('אינך מורשה להיכנס למערכת');
    }

    const jwtBearedToken = jwt.sign({}, SECRET,{ algorithm: 'HS256'});

    res.json({user: username, token: jwtBearedToken})

});

module.exports = router