var bodyParser = require('body-parser');
var express = require('express');
const app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logging with morgan
app.use(morgan('dev'));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-jsonwebtoken-auth-rest-api');

// require apiRoutes
var apiRoutes = require('./routes/api');
app.use('/api/', apiRoutes);

app.listen(1337);
