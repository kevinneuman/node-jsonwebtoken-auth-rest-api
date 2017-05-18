var express = require('express');
var User = require('../models/user');

module.exports = (function () {

    var router = express.Router();

    // this route requires a valid jwt token
    router.post('/user', function (req, res) {
        // find user
        User.findOne({ 'username': req.decoded.user.username }, '-password', function (err, user) {
            if (err || !user) { return res.json(err ? { success: false, message: err } : { success: false, message: 'User not found' }); }

            return res.json({
                success: true,
                user
            });
        });
    });

    return router;
})();
