var express = require('express');
var router = express.Router();
var callForImages = require('../public/javascripts/callGoogle');

/* GET home page. */
  router.get('/:name', function(req, res, next) {
  // console.log("name in params", req.param('image_name'));
  console.log("value", req.params.name)
  var images_data = callForImages(req.params.name);
    images_data.then(function (suc) {
      console.log('first 30 results from google', suc);
      return res.json({"status":1,data:suc})
    }).catch(function(err) {
      console.log('err', err);
      return res.json({"status":0,data:err})
    });
 
});

module.exports = router;
