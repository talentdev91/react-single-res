'use strict';

var mongoose = require('mongoose');

var powerMax = [1000, 'The value of paht `{PATH}` ({VALUE}) exceeds the limit ({MAX}) mAh'];
var cpuMax = [4.0, 'The value of paht `{PATH}` ({VALUE}) exceeds the limit ({MAX}) GHz'];
var bandwidthMax = [54, 'The value of paht `{PATH}` ({VALUE}) exceeds the limit ({MAX}) Mb/s'];

var droneSchema = new mongoose.Schema({
	make: {
		type: String,
		default: 'UA',
	},
	model: {
		type: String,
		default: '101',
	},
	dClass: {
		type: String,
		default: 'Light',
	},
	power: {
		type: Number, 
		max: powerMax,
		default: 100
	},
	cpu: {
		type: Number,
		max: cpuMax,
		default: 1.9
	},
	bandwidth: {
		type: Number,
		max: bandwidthMax,
		default: 30
	}
});

module.exports = mongoose.model('Drone', droneSchema);