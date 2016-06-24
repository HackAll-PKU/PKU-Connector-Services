/**
 * Created by ChenLetian on 16/6/24.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/home/wwwroot/pikkacho.cn/uploads/')
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({storage: storage});

var uploadImageController = require("../controllers/UploadImageController.js");

/**
 * 上传图片
 */
router.post('/api/v1/image', upload.array('image'), uploadImageController.uploadImage);

module.exports = router;