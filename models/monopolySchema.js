const mongoose = require('mongoose');

const monopolySchema = new mongoose.Schema({
	name: { String, required: true },
	piece: { String, required: true },
	money: { Number, default: 0 },
	properties: [{ property: { propName: String, value: Number } }],
});

const Monopoly = mongoose.model('Monopoly', monopolySchema);

module.exports = Monopoly;