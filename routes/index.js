var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('Index', {args: JSON.stringify({ title: 'PKU Connector', username: 'PikkaCho'})})
});

module.exports = router;
