var mongoose     = require('mongoose');
var user         = require("../models/user")
var Schema       = mongoose.Schema;
var offerRide    = new Schema({
    driverName: {type: String, required: true},
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    seats: Number,
    price: Number,
    repeat: Boolean,
    rideFrequency: String,
    rideStartDate: String,
    rideTo: {type: String, index: true},
    rideFrom: {type: String, index: true}

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
