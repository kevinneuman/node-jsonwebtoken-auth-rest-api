var express = require('express');

var register = require('./register');
var login = require('./login');
var tokenMiddleware = require('./middleware/token');
var user = require('./user');

// combine all routes and export them to server.js
// access them from http://localhost:1337/api/
var router = express.Router();
router.use(
    register,
    login,
    // everything after this requires a valid jwt token
    tokenMiddleware,
    user
);

module.exports = router;
