var express = require('express');
var bodyParser = require('body-parser')
var multiparty = require('multiparty');
var dateFormat = require('dateformat');
var fs = require('fs');
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
var collection;
var url = 'mongodb://admin:qazxdr54321@ds013270.mlab.com:13320/contact_book';
const port = process.env.PORT || 3000;
var defaultSkills = ['სამშენებლო სამუშაოები', 'მანქანით მომსახურება', 'სამეურნეო საქმე', 'შეშა'];

app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/list', function (req, res) {
    collection.find({_id: {$ne: '__skills'}}, {search: 0}).sort({
        first_name: 1,
        last_name: 1
    }).toArray(function (err, docs) {
        res.send(docs);
    });
});

app.get('/skills', function (req, res) {
    collection.find({_id: '__skills'}).limit(1).next(function (err, doc) {
        if (err) return res.send(500, {err: err});
        res.send(doc.skills);
    })
});

function generateSearchField(person) {
    var search = '';

    search += person.first_name;

    if (person.last_name) {
        search += '#' + person.last_name;
    }

    if (person.birthday) {
        search += '#' + dateFormat(new Date(person.birthday), 'yyyy-mm-dd');
    }

    if (person.email) {
        search += '#' + person.email;
    }

    if (person.phone) {
        search += '#' + person.phone;
    }

    if (person.education) {
        search += '#' + person.education;
    }

    if (person.address) {
        search += '#' + person.address;
    }

    if (person.confessor) {
        search += '#' + person.confessor;
    }

    if (person.textarea) {
        search += '#' + person.textarea;
    }

    if (person.skills) {
        search += '#' + person.skills.join('#');
    }

    return search;
}

app.post('/add', function (req, res) {
    var person = req.body;
    person.search = generateSearchField(person);
    if (person._id) {
        person._id = new mongodb.ObjectID(person._id);
        collection.updateOne({_id: person._id}, person, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.send();
        })
    } else {
        collection.insertOne(person, function (err) {
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
    collection.deleteOne({_id: new mongodb.ObjectID(id)}, function (err) {
        if (err) return res.sendStatus(500);
        res.send();
    })
});

app.post('/favorite', function (req, res) {
    var id = req.body.id;
    var favorite = req.body.favorite;
    collection.updateOne({_id: new mongodb.ObjectID(id)}, {$set: {favorite: favorite}}, function (err) {
        if (err) return res.sendStatus(500);
        res.send();
    })
});

app.post('/addSkill', function (req, res) {
    var skill = req.body.skill;
    collection.updateOne(
        {_id: '__skills'},
        {$addToSet: {skills: skill}},
        function (err) {
            if (err) return res.sendStatus(500);
            res.send();
        }
    );
});

app.get('/search', function (req, res) {
    var filter = req.query.filter;
    collection.find({search: {'$regex': filter}}, {search: 0}).toArray(function (err, docs) {
        if (err) return res.send(500, {err: err});
        res.send(docs);
    });
});

MongoClient.connect(url, function (err, database) {
    if (err) throw err;

    db = database;
    collection = db.collection('documents');
    collection.updateOne(
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
