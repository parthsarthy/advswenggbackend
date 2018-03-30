/* NodeJs mongodb tutorial - insert update delete records */
var validator  = require('validator');
var express     = require('express');
var mongodb     = require('mongodb');
var mongoose = require('mongoose');
var rides = require('../models/rides');
var user = require('../models/user');
var book = require('../models/book');
// DB Details
var dburl = "mongodb://ec2-34-244-27-78.eu-west-1.compute.amazonaws.com:27018/ridealongthree";
var options = {user: "admin", pass:"admin1002"};
var router = express.Router();

//updating user emails
router.post('/user',function(req, res, next){
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
router.post('/findrides',function(req, res, next){
      mongoose.connect(dburl, options, function(err, db){
        if(err) {console.log(err); throw error};
        db.collection('offerride').find(
              {$and: [{"rideTo":{$in:[req.body.area_to]}}, {"rideFrom":{$in:[req.body.area_from]}}]}
          ).toArray(function(err, docs){
        if(err) throw err;
        user.populate(docs, {path: 'driver'}, function(err, populatedTransactions){
            if(populatedTransactions.length===0)
            {
              res.send("Not Found");
            }
            else
            {
              console.log(populatedTransactions);
              res.json(populatedTransactions);
            }
        })
        db.close();
        })
      });
  });

function testFunction () {
    return 1;
}

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.testFunction = testFunction;
}


//Creating new rides
router.post('/offerrides',function(req, res, next){
    mongoose.connect(dburl, options, function(err, db){
      if(err) {throw error};
      db.collection('userlogin').find({"email":req.body.user_email}).toArray(function(err, docs){
        if(err) {throw error};
        // Retuns id of the current user
        var inpDate = req.body.date.split("/");
        var tempUser = new user(docs[0]);
        var date = new Date(String(inpDate[0])+String(inpDate[1])+(new Date()).getFullYear()+" "+req.body.time);
        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        console.log(date.toDateString("en-US"));
        if(date.getMinutes()===0)
        {
          min="00";
        }
        if (date.getSeconds()===0)
        {
          sec="00";
        }
        var time = date.getHours()+":"+min;
        var rideInfo = new rides({
          count: req.body.count,
          driver:tempUser._id,
          noSeats: req.body.no_of_seats,
          priceSeat: req.body.price_seat,
          phoneNo:req.body.phone_no,
          dateSelect:date.toDateString("en-US"),
          time:time,
          rideTo: req.body.area_to,
          rideFrom: req.body.area_from,
          adress1To:req.body.adress1_to,
          adress2To:req.body.adress2_to,
          adress1From:req.body.adress1_from,
          adress2From:req.body.adress2_from,
          repeat: req.body.repeat,
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

//see the incoming request
router.post('/checkReq',function(req, res, next){
    mongoose.connect(dburl, options, function(err, db){
      if(err) {throw error};
      db.collection('book').find({"reciever_email":req.body.email}).toArray(function(err, docs){
        if(err) {throw error};

        var tempbook = new book(docs[0]);
        console.log(tempbook)
        console.log(tempbook.sender_email)
        console.log(tempbook.ID)

        db.collection('userlogin').find({"email":tempbook.sender_email}).toArray(function(err,docs){
          if(err) {throw error};
          var tempUser = new user(docs[0]);
        //console.log(tempUser)/*
        //console.log(tempUser.name)
        //console.log(tempUser.ID)*/
         


        db.collection('offerride').find(tempbook.ID).toArray(function(err,docs){
          if(err) {throw error};
          var tempride = new rides(docs[0]);
        //console.log(tempride)
        /*
        console.log(tempride.noSeats)
        console.log(tempride.phoneNo)*/

        var c = {};
        c['tempUser']= tempUser;
        c ['tempride']= tempride;

        //var c = tempUser.merge(tempride);
        console.log(c);
         

        //var result = Object.assign({},tempUser, tempride);
        //console.log(result)
        res.sendStatus(200);
      });
        });
      });
    });
  });

//send booking request
router.post('/book',function(req, res, next){
    mongoose.connect(dburl, options, function(err, db) {
    if(err) { throw err; }
    var collection = db.collection('book');
    

      var book_details = new book({
              sender_email: req.body.email,
              reciever_email:req.body.user_email,
              ID: req.body.driverID
            });
      var booking = new book(book_details);
      booking.save(function(err){
        if(err) throw err;
        console.log(req.body.sender_email);
        console.log(req.body.requester_email);
        console.log(req.body.ID);
        res.send(200);
        console.log("inserted")
        db.close()
      })
    
  })
  });


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
