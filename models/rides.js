var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var offerRide = new Schema({
    driverName: String,
    seats: Number,
    price: Number,
    repeat: Boolean,
    rideFrequency: String,
    rideStartDate: Date,
    rideTo: String,
    rideFrom: String
    
  });

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

module.exports = mongoose.model('rides', offerRide);
module.exports = mongoose.model('findRide',findRide);
