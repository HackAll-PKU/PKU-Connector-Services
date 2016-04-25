var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   title = 'PKU Connector';
   username = "Pikka Cho";
   groupList = [{"title": "软双", "href" : "/"},
                 {"title": "运动会", "href" : "/"},
                 {"title": "database", "href" : "/"}];
   talkingList = [];
   data = {title: title, username: username, groupList: groupList, talkingList: talkingList}
   res.render('Index', {args: JSON.stringify(data)})
});

module.exports = router;
