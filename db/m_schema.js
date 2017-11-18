var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var search_keyword = new Schema({
    keyword: {type:String, unique:true},
    image_link:Array
});
var keyWord = mongoose.model('searchkeywords', search_keyword);

module.exports.savekeyWord = function(data, callback){
    // console.log("keyword data before save", data)
    // keyWord.index({"keyword":1}, {unique:true})
    // Model.on('index', function (error) {
    var key = new keyWord(data);
    key.save(callback);
    // });
}

module.exports.getkeyword = function(data, indx, callback){
    keyWord.find(data, indx, callback);
}

module.exports.getprofile = function(data, callback){
    keyWord.findOne(data, callback);
}