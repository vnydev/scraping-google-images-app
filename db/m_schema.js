var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var search_keyword = new Schema({
    keyword: String
});
var keyWord = mongoose.model('searchkeywords', search_keyword);

module.exports.savekeyWord = function(data, callback){
    console.log("keyword data before save", data)
    var key = new keyWord(data);
    key.save(callback);
}

module.exports.getkeyword = function(callback){
    keyWord.find({}, callback)
}