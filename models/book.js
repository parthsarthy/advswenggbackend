//book.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var book = new Schema({
    sender_email: String,
    requester_email:String,
    ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},{ versionKey:false});

module.exports = mongoose.model('book',book,'book');