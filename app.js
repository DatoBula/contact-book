var express = require('express');
var multiparty = require('multiparty');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;
var url = 'mongodb://admin:qazxdr54321@ds013270.mlab.com:13320/contact_book';

app.use(express.static('public'));

app.get('/list', function (req, res) {
    db.collection('documents', function (err, collection) {
        collection.find({}).toArray(function (err, docs) {
            res.send(JSON.stringify(docs));
        });
    });
});

app.get('/skills', function (req, res) {
    res.send(JSON.stringify(['თოხვა', 'ბარვა', 'თიბვა']));
});

app.post('/add', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);

        res.end();
    });
});

MongoClient.connect(url, function (err, database) {
    if (err) throw err;

    db = database;

    // Start the application after the database connection is ready
    app.listen(3030, function () {
        console.log('Example app listening on port 3030!');
    });
});
