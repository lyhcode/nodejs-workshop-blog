var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    if (err) throw err;

    db.collection('post').find().toArray(function (err, result) {
      if (err) throw err;
      res.render('index', { title: 'Express', posts: result });
    });
  });
});

router.get('/show', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    if (err) throw err;

    db.collection('post').findOne({_id: new ObjectID(req.query.id)})
    .then(function(result) {
      res.render('show', { title: result.title, post: result });
    });
  });
});

module.exports = router;
