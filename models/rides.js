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
    repeat: String,
    phoneNo:Number,
    dateSelect:String,
    time:String,
    rideTo: {type: String, index: true},
    adress1To:String,
    adress2To:String,
    rideFrom: {type: String, index: true},
    adress1From:String,
    adress2From:String,

  },{versionKey:false});

module.exports = mongoose.model('rides', offerRide, 'offerride');
