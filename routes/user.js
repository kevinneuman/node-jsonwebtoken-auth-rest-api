var express = require('express');
var User = require('../models/user');

module.exports = (function () {

    var router = express.Router();

    // this route requires a valid jwt token
    router.post('/user', function (req, res) {
        // find user
        User.findOne({ 'username': req.decoded.username }, '-_id -__v -password', function (err, user) {
            if (err) { return res.status(500).json({ success: false }); }

            // user found
            if (user) {
                return res.status(200).json({
                    success: true,
                    user
                });
            }

            else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        });
    });

    return router;
})();
