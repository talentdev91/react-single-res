'use strict';

var express = require('express');
var mongoose = require('mongoose');
var droneRoutes = require('./routes/drones_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/droneApp_dev');

var app = express();
app.use(express.static(__dirname + '/build'));

var mainRouter = express.Router();

droneRoutes(mainRouter);

app.use('/api/v1', mainRouter);

app.listen(process.env.PORT || 3333, function() {
	console.log('Server is listening on port ' + (process.env.PORT || 3333));
});