var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var user = new Schema({
    email: String
    });

module.exports = mongoose.model('user',user,'userlogin');
