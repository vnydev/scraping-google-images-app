var express = require('express');
var router = express.Router();
var fs = require('fs'),
  request = require('request');
var path = require('path');
var callForImages = require('../public/javascripts/callGoogle');
var keyword = require('../db/m_schema')
const filesArray = [];
var imageDetails = [];
/* GET home page. */


router.get('/images', function (req, res, next) {
  console.log("name in params", req.param('image_name'));
  // console.log("data in params", req.params)
  var name = req.param('image_name')
  var images_data = callForImages(name);
  images_data.then(function (suc) {
    console.log('first 30 results from google', suc.length);
    imageDetails = suc;
    res.json({ "status": 1, data: suc })
  }).catch(function (err) {
    console.log('err', err);
    return res.json({ "status": 0, data: err })
  });
});

// router.get('/saveimages', function (req, res) {
//   var download = function (uri, filename, callback) {
//     request.head(uri, function (err, res, body) {
//       console.log('content-type:', res.headers['content-type']);
//       console.log('content-length:', res.headers['content-length']);
//       // res.send("image save");
//       request(uri).pipe(fs.createWriteStream(path.join(__dirname + './../savedfiles', filename))).on('close', callback);
//     });
//   };
//   var url = "https://rapdose.com/wp-content/uploads/2015/10/Rick-Ross-Black-Market.png";
//   var savePath = 'Rick-Ross-Black-Market.png';
//   download(url, savePath, function () {
//     console.log('done');

//   });
// })
var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(path.join(__dirname + './../app/savedfiles', filename))).on('close', callback);
  });
};
router.post('/search_keyword', function (req, res) {
  if (imageDetails.length > 0) {
    for (var i = 0; i < imageDetails.length / 2; i++) {
      var imageType = imageDetails[i].type;
      var imageUrl = imageDetails[i].url;
      var newFilename = "";
      var fileName = imageUrl.split('/').pop().split('#')[0].split('?')[0];
      if (fileName.lastIndexOf('.') == -1) {
        // console.log("file don't have ext", fileName)
        if (imageType.split('/').pop() != "" && imageType.split('/').pop() != -1) {
          // console.log("have ext")
          fileName = fileName + '.' + imageType.split('/').pop();
          newFilename = fileName;
        } else {
          // console.log("ext not have")
          fileName = fileName + '.jpg';
          newFilename = fileName;
        }

      } else {
        newFilename = fileName;
        // console.log("filename with ext", newFilename)
      }
      filesArray.push(newFilename);
      download(imageUrl, newFilename, function (err, suc) {
        console.log('done');
        if (err) {
          console.log("file not download")
        } else if (suc) {
          console.log("image file download", suc)

        }
      });
    }
  }
  var data = { 'keyword': req.body.keyword, 'image_link': filesArray }
  if (filesArray.length === imageDetails.length / 2) {
    console.log("image link before save into db", filesArray)
    keyword.savekeyWord(data, function (err, suc) {
      if (err) {
        console.error("keyword not save because some internal error", err);
        return res.status(500).jsonp({ status: 0, msg: "data couldn't be process" });
      } else if (suc) {
        console.log("keyword save successfully!", suc)
        return res.status(200).jsonp({ status: 1, data: suc })
      }
    });
  }
})

router.get('/search_history', function (req, res) {
  keyword.getkeyword({}, { 'keyword': 1 }, function (err, suc) {
    if (err) {
      console.error("search history is null", err);
      return res.status(500).jsonp({ status: 0, msg: "data couldn't be process" });
    } else if (suc) {
      console.log("get search history successfully!", suc)
      return res.status(200).jsonp({ status: 1, data: suc })
    }
  })
})

router.get('/search_profile_details', function(req,res){
  // console.log("search profile req", req.body)
  var keyWord =  req.param('keyword');
  var data = {"keyword":keyWord};
  keyword.getprofile(data, function(err, suc){
    if (err) {
      console.error("profile details not found", err);
      return res.status(500).jsonp({ status: 0, msg: "data couldn't be process" });
    } else if (suc) {
      console.log("successfully got the profile details", suc)
      return res.status(200).jsonp({ status: 1, data: suc })
    }else{
      res.status(404).jsonp({ status: 0, msg: "data not found" })
    }
  });
})
module.exports = router;
