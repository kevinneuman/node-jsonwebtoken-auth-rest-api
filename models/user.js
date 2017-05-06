var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, unique: true },
    password: String
}, { timestamps: true });

var User = mongoose.model('User', userSchema);

module.exports = User;