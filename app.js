const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1/bigBiteBurgerContact', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;


// Define mongoose schema..
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);   // Convert the schema into a model

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));  // FOR SERVING STATIC FILES
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');  // SET THE TEMPLATE ENGINE AS PUG
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    const myContact = new Contact(req.body);
    myContact.save().then(()=>{
        res.send("This contact form saved sucessfully in database!");
    }).catch(()=>{
        res.status(400).send("This contact form not saved to the database!");
    });
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

