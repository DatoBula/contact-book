var express = require('express');
var bodyParser = require('body-parser')
var multiparty = require('multiparty');
var fs = require('fs');
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
var url = 'mongodb://localhost/site';
const port = process.env.PORT || 3000;
var defaultSkills = ['სამშენებლო სამუშაოები', 'მანქანით მომსახურება', 'სამეურნეო საქმე', 'შეშა'];

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/list', function (req, res) {
    db.collection('documents', function (err, collection) {
        collection.find({_id: {$ne: '__skills'}}).toArray(function (err, docs) {
            res.send(docs);
        });
    });
});

app.get('/skills', function (req, res) {
    db.collection('documents').find({_id: '__skills'}).limit(1).next(function (err, doc) {
        if (err) return res.send(500, {err: err});
        res.send(doc.skills);
    })
});

app.post('/add', function (req, res) {
    var person = req.body;
    if (person._id) {

    } else {
        db.collection('documents').insertOne(person, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.send();
        });
    }
});

app.post('/delete', function (req, res) {
    var id = req.body.id;
    db.collection('documents').deleteOne({_id: new mongodb.ObjectID(id)}, function (err) {
        if (err) return res.sendStatus(500);
        res.send();
    })
});

app.post('/favorite', function (req, res) {
    var id = req.body.id;
    var favorite = req.body.favorite;
    db.collection('documents').updateOne({_id: new mongodb.ObjectID(id)}, {$set: {favorite: favorite}}, function (err) {
        if (err) return res.sendStatus(500);
        res.send();
    })
});

app.post('/addSkill', function (req, res) {
    var skill = req.body.skill;
    db.collection('documents').updateOne(
        {_id: '__skills'},
        {$addToSet: {skills: skill}},
        function (err) {
            if (err) return res.sendStatus(500);
            res.send();
        }
    );
});

MongoClient.connect(url, function (err, database) {
    if (err) throw err;

    db = database;
    db.collection('documents').updateOne(
        {_id: '__skills'},
        {$addToSet: {skills: {$each: defaultSkills}}},
        function (err) {
            if (err) return console.error(err);
            app.listen(port, function () {
                console.log('Example app listening on port ' + port);
            });
        }
    );
});
