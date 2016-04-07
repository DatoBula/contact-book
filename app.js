var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient
var db;
var url = 'mongodb://localhost:27017/site';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/list', function(req, res) {
  db.collection('documents', function(err, collection) {
    collection.find({}).toArray(function(err, docs) {
      res.send(JSON.stringify(docs));
    });
  });
});

app.get('/skills', function(req, res) {
  res.send(JSON.stringify(['თოხვა', 'ბარვა', 'თიბვა']));
});

app.post('/add', function(req, res) {
  console.log(req.body);
  res.send()
});

MongoClient.connect(url, function(err, database) {
  if (err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3030, function() {
    console.log('Example app listening on port 3030!');
  });
});
