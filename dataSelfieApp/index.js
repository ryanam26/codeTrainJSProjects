const express = require('express');
const Datastore = require('nedb');

const app = express()
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

//GET request
app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            console.log("You have an error");
            res.end();
            return;
        }
        res.json(data)
    });
});

//POST request
app.post('/api', (req, res) => {
    // res.send('POST request to the homw page')
    const data = req.body
    const timestamp = Date.now()
    data.timestamp = timestamp;
    database.insert(data)
    res.json(data);
})