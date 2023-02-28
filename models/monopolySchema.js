const mongoose = require('mongoose');

const monopolySchema = new mongoose.Schema({
	name: { type: String, required: true },
	piece: { type: String, required: true },
	money: { type: Number, default: 1500 },
	properties: [Object],
});

const Monopoly = mongoose.model('monopolySchema', monopolySchema);

module.exports = Monopoly;
