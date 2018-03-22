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

//updating user emails
router.route('/user')
  .get(function(req, res, next){
    mongoose.connect(dburl, options, function(err, db) {
    if(err) {  console.log(err); throw err;  }
    data = '';
    db.collection('userlogin').find().toArray(function(err, docs){
      if(err) throw err;
      res.json(docs);
      db.close();
      })
    });
  })
  .post(function(req, res, next){
    mongoose.connect(dburl, options, function(err, db) {
    if(err) { throw err; }
    var collection = db.collection('userlogin');
    if (validator.isEmail(String(req.body.email))){
      var userEmail = new user({
              email: req.body.email,
              name: req.body.name,
              profileImg: req.body.image_url
            });
          console.log(userEmail);
      collection.find({"email":String(req.body.email)}).count()
      .then(function(numItems) {
        if(numItems===1){
        res.send("user exists");
      }
      else{
        userEmail.save(function(err){
        if(err) throw err;
        res.send("new user");
        db.close()
      });
      }
    })
    }
    else{
      res.send("False");
    }
  })
  });

//retreiving offered rides for user
router.route('/RetrievRides')
  .post(function(req, res, next){
      mongoose.connect(dburl, options, function(err, db){
        if(err) {console.log(err); throw error};
        db.collection('offerride').aggregate([{$match: {"rideTo":req.body.rideTo}},{$match: {"rideFrom":req.body.rideFrom} },{$match: {"rideFrequency":req.body.rideFrequency}}]).toArray(function(err, docs){
        if(err) throw err;
        res.json(docs);
        db.close();
        })
      });
  });


//Creating new rides
router.route('/offerrides')
  .get(function(req, res, next){
      mongoose.connect(dburl, options, function(err, db) {
      if(err) {  console.log(err); throw err;  }
      data = '';
      db.collection('offerride').aggregate([{$match: {"rideTo":req.body.rideTo}},{$match: {"rideFrom":req.body.rideFrom} }]).toArray(function(err, docs){
        //db.collection('offerride').aggregate([{$match: {"rideTo":"Dublin1"}},{$match: {"rideFrom":"Dublin2"} }])
        if(err) throw err;
        res.json(docs);
        db.close();
        })
      });
    })
  .post(function(req, res, next){
    // var userObID = "";
    mongoose.connect(dburl, options, function(err, db){
      if(err) {throw error};
      db.collection('userlogin').find({"email":req.body.email}).toArray(function(err, docs){
        if(err) {throw error};
        // Retuns id of the current user
        var tempUser = new user(docs[0]);
        // console.log(typeof(String(docs[0]._id)));
        var rideInfo = new rides({
          driverName: req.body.driverName,
          driver:tempUser._id,
          seats: req.body.seats,
          price: req.body.price,
          repeat: req.body.repeat,
          rideFrequency: req.body.rideFrequency,
          rideStartDate: req.body.rideStartDate,
          rideTo: req.body.rideTo,
          rideFrom: req.body.rideFrom
        });
        // console.log(rideInfo);
        var ride = new rides(rideInfo);
        ride.save(function(err){
          if(err) {throw error}
            res.sendStatus(200);
        });
      });
    });
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
