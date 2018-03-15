var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var user = new Schema({
    email: String,
},{ versionKey:false});

module.exports = mongoose.model('user',user,'userlogin');
