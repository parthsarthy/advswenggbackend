//book.js
var mongoose     = require('mongoose');
var user         = require("../models/rides")
var Schema       = mongoose.Schema;
var book = new Schema({
    sender_email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    reciever_email:String,
    ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rides'
    },
},{ versionKey:false});


module.exports = mongoose.model('book',book,'book');
