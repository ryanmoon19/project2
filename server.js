const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bp = require('body-parser');
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const monopolySchema = require('./models/monopolySchema.js');
const monopolyData = require('./models/monopolyData.js');
const propertiesData = require('./models/propertiesData.js');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.static('public/'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


// SEED ROUTE
// app.get('/monopoly/seed', (req, res) => {
//     monopolySchema.create(monopolyData, (err, seededMonopoly) =>{
//         res.send(seededMonopoly)
//     })
// })

// INDEX ROUTE
app.get('/', (req, res) => {
	monopolySchema.find({}, (err, displayAllmonopoly) => {
		res.render('index.ejs', { monopoly: displayAllmonopoly });
	});
});

// NEW ROUTE
app.get('/monopoly/new', (req, res) => {
	res.render('new.ejs');
});

// SHOW ROUTE
app.get('/monopoly/:id', (req, res) => {
	monopolySchema.findById(req.params.id, (err, showMonopoly) => {
		res.render('show.ejs', { monopoly: showMonopoly });
	});
});

// EDIT ROUTE
app.get('/monopoly/:id/edit', (req, res) => {
	monopolySchema.findById(req.params.id, (err, editMonopoly) => {
		res.render('edit.ejs', {
			monopoly: editMonopoly,
			propertyList: propertiesData,
		});
	});
});

//CREATE ROUTE
app.post('/monopoly', (req, res) => {
	monopolySchema.create(req.body, (err, createdMonopoly) => {
		res.redirect('/monopoly');
	});
});

// UPDATE ROUTE
app.put('/monopoly/:id', (req, res) => {
	const body = { ...req.body };
	body.properties = [];
	const propSelector = Object.keys(req.body)
		.filter((item) => {
			return item.startsWith('purchase_');
		})
		.map((item) => {
			delete body[item];
			let data = item.split('_')[1];
			return data;
		});
	const filtered = propertiesData
		.filter((prop) => {
			return propSelector.includes(prop.propName);
		})
		.map((prop) => {
			prop.isPurchased = true;
			return prop;
		});
	body.properties = filtered;
	monopolySchema.findByIdAndUpdate(
		req.params.id,
		body,
		{ new: true },
		(err, updatedMonopoly) => {
			res.redirect('/monopoly');
		}
	);
});

// DELETE ROUTE
app.delete('/monopoly/:id', (req, res) => {
	monopolySchema.findByIdAndDelete(req.params.id, (err, deletedMonopoly) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/monopoly');
		}
	});
});

// connection to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB, () => {
	console.log('The connection with mongod is established');
});

// LISTENER
app.listen(PORT, () => {
	console.log('listening...');
});

