var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var User = require('../models/user');

module.exports = (function () {

    var router = express.Router();

    router.post('/register', function (req, res) {
        // username and password is required
        if (req.body.username && req.body.password) {
            // find user
            User.findOne({ 'username': req.body.username }, function (err, user) {
                if (err) { res.status(500).json({ success: false }); }

                else {
                    // overwrite plain text password with encrypted password before saving
                    // generate a salt
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) { res.status(500).json({ success: false }); }

                        // hash (encrypt) our password using the salt
                        bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                            // create user
                            var user = new User({
                                username: req.body.username,
                                password: hash
                            });

                            // save user
                            user.save(function (err) {
                                if (err) { res.status(409).json({ success: false, message: 'Username taken' }); }

                                else {
                                    res.status(200).json({
                                        success: true,
                                        message: 'User created'
                                    });
                                }
                            });
                        })
                    });
                }
            });
        }

        else {
            res.status(400).json({
                success: false,
                message: 'Username and password is required'
            });
        }
    });
    return router;
})();
