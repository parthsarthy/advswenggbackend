var mongoose     = require('mongoose');
var user         = require("../models/user")
var Schema       = mongoose.Schema;
var offerRide    = new Schema({
    // count: {type: String, required: true},
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    noSeats: Number,
    priceSeat: Number,
    repeat: Boolean,
    phoneNo:Number,
    dateSelect:String,
    time:Date,
    rideTo: {type: String, index: true},
    adress1To:String,
    adress2To:String,
    rideFrom: {type: String, index: true},
    adress1From:String,
    adress2From:String,

  },{versionKey:false});

var findRide = new Schema({
	driverName: String,
    seats: Number,
    price: Number,
    repeat: Boolean,
    rideFrequency: String,
    rideStartDate: Date,
    rideTo: String,
    rideFrom: String
});

module.exports = mongoose.model('rides', offerRide, 'offerride');
// module.exports = mongoose.model('findRide',findRide);
