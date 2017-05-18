var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../constants');

module.exports = (function () {

    var router = express.Router();

    router.post('/login', function (req, res) {
        // find user
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err || !user) { return res.json(err ? { success: false, message: err } : { success: false, message: 'User not found' }); }

            // compare passwords
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (err) { return res.json({ success: false, message: err }); }

                // passwords match
                if (isMatch) {
                    // create jwt
                    // sign with default (HMAC SHA256)
                    var token = jwt.sign({ user }, constants.JWT_SECRET, { expiresIn: '365d' }); // expires in 1 year

                    return res.json({
                        success: true,
                        token
                    });
                }

                else {
                    return res.json({
                        success: false,
                        message: 'Wrong password'
                    });
                }
            });
        });
    });

    return router;
})();
