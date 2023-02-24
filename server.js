const express = require('express')
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')

require('dotenv').config();
const monopolySchema = require('./models/monopolySchema.js')
const monopolyData = require('./models/monopolyData.js');



// MIDDLEWARE
app.use(methodOverride('_method'))

// INDEX ROUTE
app.get('/monopoly', (req, res) => {
    monopolySchema.find({}, (err, displayAllmonopoly) => {
        res.render('index.ejs', {monopoly: displayAllmonopoly});
    }) 
});

// NEW ROUTE
app.get('/monopoly/new', (req, res) => {
    res.render('new.ejs');
});

// SHOW ROUTE
app.get('/monopoly/:id', (req, res) => {
    monopolySchema.findById(req.params.id, (err, showMonopoly) => {
        res.render('show.ejs', {monopoly: showMonopoly});
    })
});

// EDIT ROUTE
app.get('/monopoly/:id/edit', (req, res) => {
    monopolySchema.findById(req.params.id, (err, editMonopoly) => {
        res.render('edit.ejs', {monopoly: editMonopoly})
    })
});

//CREATE ROUTE
app.post('/monopoly', (req, res) => {
    monopolySchema.create(req.body, (err, createdMonopoly) => {
        res.redirect('/monopoly')
    })
})

// UPDATE ROUTE
app.put('/monopoly/:id', (req, res) => {
    monopolySchema.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMonopoly) => {
        res.send(updatedMonopoly);
    })
})

// DELETE ROUTE
app.delete('/monopoly/:id', (req, res) => {
    monopolychema.findByIdAndDelete(req.params.id, (err, deletedMonopoly) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/monopoly')
        }
    })
});


// SEED ROUTE
app.get('/monopoly/seed', (req, res) => {
    monopolySchema.create(monopolyData, (err, seededMonopoly) =>{
        res.send(seededMonopoly)
    })
})


// connection to mongodb
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB, ()=>{
    console.log("connection with mongodb is established...")
})

// LISTENER
app.listen(3000, () =>{
    console.log('listening...')
})