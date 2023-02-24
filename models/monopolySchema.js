const mongoose = require('mongoose');

const monopolySchema = new mongoose.Schema({
	name: { type: String, required: true },
	piece: { type: String, required: true },
	money: { type: Number, default: 0 },
	properties: [{
        property: { 
            propName: String,
            value: Number
        }
    }],
});

const Monopoly = mongoose.model('monopolySchema', monopolySchema);

module.exports = Monopoly;