'use strict';

var Drone = require('../models/Drone');
var bodyparser = require('body-parser');

module.exports = function() {
	
	app.use(bodyparser.json());

	app.get('/drones', function(req, res) {
		Drone.find({}, function(err, data) {
			if (err) {
				res.status(500).send({'error': 'Unable to retrieve notes.'});
				return;
			}
		});
	});

	app.post('/drones', function(req, res) {
		var newDrone = new Drone(req.body);

		newDrone.save(function (err, data) {
			if (err) {
				res.status(500).send({'error': 'data could not be saved.'});
				return;
			}

			res.json(data);
		});
	});
};