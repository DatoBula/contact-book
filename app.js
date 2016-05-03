var express = require('express');
var multiparty = require('multiparty');
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
var url = 'mongodb://admin:qazxdr54321@ds013270.mlab.com:13320/contact_book';
const port = process.env.PORT || 3000;
var defaultSkills = ['სამშენებლო სამუშაოები', 'მანქანით მომსახურება', 'სამეურნეო საქმე', 'შეშა'];

app.use(express.static('public'));

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
    var form = new multiparty.Form({encoding: 'utf8'});
    form.parse(req, function (err, fields, files) {
        var ids = ['first_name', 'last_name', 'email', 'phone', 'birthday', 'address', 'education',
            'confessor', 'textarea'];
        var user = {};
        for (var i in ids) {
            var field = fields[ids[i]];
            if (field) {
                user[ids[i]] = field[0];
            }
        }
        if (fields.skills && fields.skills[0]) {
            user.skills = fields.skills[0].split(',');
        }

        console.log(user);
        console.log(files);

        res.end();
    });
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
