var express = require('express');
var router = express.Router();
var callForImages = require('../public/javascripts/callGoogle');
var keyword = require('../db/m_schema')
const downloader = require('image-downloader')
const filesArray = [];

/* GET home page. */
router.get('/images', function (req, res, next) {
  console.log("name in params", req.param('image_name'));
  // console.log("data in params", req.params)
  var name = req.param('image_name')
  var images_data = callForImages(name);
  images_data.then(function (suc) {
    console.log('first 30 results from google', suc.length);
    if (suc.length > 0) {
     
      for (var i = 0; i < suc.length / 2; i++) {
        console.log("1st image data in array", suc[i].url);
        filesArray.push(suc[i].url)
      }
      
    }

    return res.json({ "status": 1, data: suc })
  }).catch(function (err) {
    console.log('err', err);
    return res.json({ "status": 0, data: err })
  });

});

router.post('/search_keyword', function (req, res) {
  console.log("search keyword", req.body)
  // res.status(status).send({msg:"keyword to search", data:req.body.keyword});
  // res.jsonp({ msg: req.body.keyword });
  var data = { 'keyword': req.body.keyword }
  keyword.savekeyWord(data, function (err, suc) {
    if (err) {
      console.error("keyword not save because some internal error", err);
      return res.status(500).jsonp({ status: 0, msg: "data couldn't be process" });
    } else if (suc) {
      console.log("keyword save successfully!", suc)
      return res.status(200).jsonp({ status: 1, data: suc })
    }
  });

})

router.get('/search_history', function (req, res) {
  keyword.getkeyword(function (err, suc) {
    if (err) {
      console.error("search history is null", err);
      return res.status(500).jsonp({ status: 0, msg: "data couldn't be process" });
    } else if (suc) {
      console.log("get search history successfully!", suc)
      return res.status(200).jsonp({ status: 1, data: suc })
    }
  })
})
module.exports = router;
