var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var routes = require('./routes.js');
app.use('/users', routes);

module.exports = app;
