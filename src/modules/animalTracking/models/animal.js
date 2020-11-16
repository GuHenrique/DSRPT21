const mongoose = require('mongoose');
const PointSchema = require('../../system/models/PointSchema');

const animalSchema = new mongoose.Schema({
	code: Number,
	statusMessage: Boolean,
	type: String,
	infos: [],
	dtCreate: String,
	location: {
			type: PointSchema,
			index: '2dsphere'
	}
});

module.exports = mongoose.model('Animal', animalSchema);