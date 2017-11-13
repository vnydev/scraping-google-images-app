var Scraper = require ('images-scraper');
var google = new Scraper.Google();

var getImages = function(keyWord){
    console.log("call is going to fetch from google")
    var call = google.list({
        keyword: keyWord,
        num: 30,
        detail: true,
        nightmare: {
            show: false
        }
      })
      return call;
    //   .then(function (res) {
    //     console.log('first 30 results from google', res);
    //     return {"status":1,data:res}
    //   }).catch(function(err) {
    //     console.log('err', err);
    //     return {"status":0,data:err}
    //   });
      
      // you can also watch on events
    //   google.on('result', function (item) {
    //     console.log('out', item);
    //   });
}

module.exports = getImages;
