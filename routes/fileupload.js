var express = require('express');
var router = express.Router();
var keyword =  require('../db/m_schema')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/upload_images', upload.single('file_to_upload'), function (req, res, next) {
    // req.files is array of `photos` files 
    // req.body will contain the text fields, if there were any 
    console.log(JSON.stringify(req.body, 0, 2));
    res.end(JSON.stringify(req.file, 0 ,2));
})

module.exports = router;