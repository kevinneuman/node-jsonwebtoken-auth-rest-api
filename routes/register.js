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
                if (err || user) { return res.json(err ? { success: false, message: err } : { success: false, message: 'Username taken' }); }

                // overwrite plain text password with encrypted password before saving
                // generate a salt
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) { return res.json({ success: false, message: err }); }

                    // hash (encrypt) our password using the salt
                    bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                        if (err) { return res.json({ success: false, message: err }); }

                        // create user
                        var user = new User({
                            username: req.body.username,
                            password: hash
                        });

                        // save user
                        user.save(function (err) {
                            if (err) { return res.json({ success: false, message: err }); }

                            else {
                                return res.json({
                                    success: true,
                                    message: 'User ' + req.body.username + ' created'
                                });
                            }
                        });
                    });
                });
            });
        }

        else {
            return res.json({
                success: false,
                message: 'Username and password is required'
            });
        }
    });

    return router;
})();
