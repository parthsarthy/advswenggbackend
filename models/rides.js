var rideSchema = new Schema({
    driverName: String,
    seats: Number,
    price: Number,
    repeat: Boolean,
    rideFrequency: String,
    rideStartDate: Date,
    rideTo: String,
    r
    // comments: [{ body: String, date: Date }],
    // ridedate: { type: Date, default: Date.now },
    // meta: {
    //   votes: Number,
    //   favs:  Number
    }
  });