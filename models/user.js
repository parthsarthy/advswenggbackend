var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var user = new Schema({
    email: {type: String, index: true, unique: true},
    name: String,
    profileImg: String
},{ versionKey:false});

module.exports = mongoose.model('user',user,'userlogin');
