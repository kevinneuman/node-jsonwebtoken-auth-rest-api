var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../constants');

module.exports = (function () {

    var router = express.Router();

    router.post('/login', function (req, res) {
        // username and password is required
        if (req.body.username && req.body.password) {
            // find user
            User.findOne({ 'username': req.body.username }, function (err, user) {
                if (err) { return res.status(500).json({ success: false }); }

                // user found
                if (user) {
                    // compare passwords
                    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                        if (err) { return res.status(500).json({ success: false }); }

                        // passwords match
                        if (isMatch) {
                            // create jwt
                            // sign with default (HMAC SHA256)
                            var token = jwt.sign({ username: user.username }, constants.JWT_SECRET, { expiresIn: '365d' }); // expires in 1 year

                            return res.status(200).json({
                                success: true,
                                token
                            });
                        }

                        else {
                            return res.status(401).json({
                                success: false,
                                message: 'Wrong password'
                            });
                        }
                    });
                }

                else {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
                }
            });
        }

        else {
            return res.status(400).json({
                success: false,
                message: 'Username and password is required'
            });
        }
    });
    return router;
})();
