var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient
var db;
var url = 'mongodb://localhost:27017/site';
// Initialize connection once

app.use(express.static('public'));

app.get('/list', function (req, res) {
    console.log('request')
    db.collection('documents', function (err, collection) {
        collection.find({}).toArray(function (err, docs) {
            console.log(err)
            console.log("Found the following records");
            console.log(docs);
            res.send(JSON.stringify(docs));
        });
    });
});

app.get('/skills', function (req, res) {
    res.send(JSON.stringify(['თოხვა', 'ბარვა', 'თიბვა']));
});

app.post('/add', function (req, res) {
    // TODO insert document
});

MongoClient.connect(url, function (err, database) {
    if (err) throw err;

    db = database;

    // Start the application after the database connection is ready
    app.listen(80, function () {
        console.log('Example app listening on port 80!');
    });
});