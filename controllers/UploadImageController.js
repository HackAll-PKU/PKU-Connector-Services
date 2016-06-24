/**
 * Created by ChenLetian on 16/6/24.
 */


/**
 * 上传一张图片
 */
exports.uploadImage = function (req, res) {

    if (req.files) {
        var filenames = req.files.map(function (oneImage) {
            return "/uploads/" + oneImage.filename
        });
        res.json({
            msg: "OK",
            data: filenames
        });
    }
    else {
        res.status(500).json({
            msg: "未知错误"
        });
    }


};
