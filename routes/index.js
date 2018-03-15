/* NodeJs mongodb tutorial - insert update delete records */
var validator  = require('validator');
var express     = require('express');
var mongodb     = require('mongodb');
var mongoose = require('mongoose');
var rides = require('../models/rides');
var user = require('../models/user');
// DB Details
var dburl = "mongodb://ec2-34-244-27-78.eu-west-1.compute.amazonaws.com:27018/ridealongthree";
var options = {user: "admin", pass:"admin1002"};
var router = express.Router();


router.route('/user')
  .get(function(req, res, next){
    mongoose.connect(dburl, options, function(err, db) {  
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('userlogin').find().toArray(function(err, docs){
      if(err) throw err;
      // res.render('index.jade', {data: docs});
      res.json(docs);
      // console.log(docs);
      db.close();
    });
  });
  })
  .post(function(req, res, next){
    mongoose.connect(dburl, options, function(err, db) {
    if(err) { throw err; }
    var collection = db.collection('userlogin');
    if (validator.isEmail(String(req.body.email))){
      var userEmail = new user({
              email: req.body.email
            });
      var x = collection.find({["email"]:userEmail}).limit(1).count();
      console.log(x);
      if(1===1){
        res.send("haha");


      }
      else{
        collection.update({'_id':new mongodb.ObjectID(req.body.id)} ,{$set:{'from': req.body.from,}})
        userEmail.save(function(err){
        if(err) throw err;
        res.send(200);
        db.close()
      });}
      
    }
    else{
      res.send("False");
    }

  })
  });


///////////////////////////////////////////////////
  router.post('/findride', function(req,res,next){
    mongoose.connect(dburl, options, function(err, db) {
      if(err) {throw error; }
      var collection = offerrides;
      collection.find()
    });
  });



// router.get('/checkuser', function(req, res, next){});

router.get('/', function(req, res, next) {
  mongoose.connect(dburl, options, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('userlogin').find().toArray(function(err, docs){
      if(err) throw err;
      // res.render('index.jade', {data: docs});
      res.json(docs);
      // console.log(docs);
      db.close();
    });
  });
});

router.get('/fetchdata', function(req, res, next) {
   var id = req.query.id;
   mongoose.connect(dburl, options,function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('userlogin').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){
      if(err) throw err;
      res.send(docs);
      db.close();
    });
  });
});

router.post('/add', function(req, res, next) {
  mongoose.connect(dburl, options, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('userlogin');
    var email = String(req.body.email);
    console.log(req.body);
    if (validator.isEmail(String(email))){
      var product = { email: req.body.email };
      collection.insert(product, function(err, result) {
      if(err) { throw err; }
        db.close();
        // res.redirect('/');
        res.sendStatus(200);
       });
    }
    else{
      res.send("False");
    }
    
  });
});
router.post('/edit', function(req, res, next) {
  mongoose.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection = db.collection('userlogin');
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
  mongoose.connect(dburl, function(err, db) {
    if(err) { throw err;  }

    db.collection('userlogin', function(err, products) {
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
