/* NodeJs mongodb tutorial - insert update delete records */

var express     = require('express');
var router      = express.Router();
var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;

var dburl = "mongodb://ec2-34-244-27-78.eu-west-1.compute.amazonaws.com:27018/admin";

/* GET products listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('CarBooking').find().toArray(function(err, docs){
      if(err) throw err;
      res.render('index.jade', {data: docs});
      db.close();
    });
  });
});

router.get('/fetchdata', function(req, res, next) {
   var id = req.query.id;
   MongoClient.connect(dburl, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('CarBooking').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
      if(err) throw err;
      res.send(docs);
      db.close();
    });
  });
});

router.post('/add', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('CarBooking');
    var product = { from: req.body.from,to: req.body.to, seats: req.body.seats, price: req.body.price,time: req.body.time,repetition: req.body.repetition};
    collection.insert(product, function(err, result) {
    if(err) { throw err; }
      db.close();
      res.redirect('/');
     });
  });
});
router.post('/edit', function(req, res, next) {
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('CarBooking');
    var product = {'product_name': req.body.product_name, 'price': req.body.price, 'category': req.body.category};
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, {$set:{'from': req.body.from,'to': req.body.to, 'seats': req.body.seats, 'price': req.body.price,'time': req.body.time,'repetition': req.body.repetition}}, function(err, result) {
    if(err) { throw err; }
      db.close();
      res.redirect('/');
     });
  });
});

router.get('/delete', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }

    db.collection('CarBooking', function(err, products) {
      products.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
         throw err;
       }else{
          db.close();
          res.redirect('/');
       }
    });
  });
});

module.exports = router;
