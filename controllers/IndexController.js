/**
 * Created by ChenLetian on 16/4/26.
 */

exports.indexPage = function (req, res, next) {
    var title = 'PKU Connector';
    var username = "Pikka Cho";
    var groupList = [{title: "软双", href: "/"},
        {title: "运动会", href: "/"},
        {title: "database", href: "/"}];
    var talkingList = [{username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "寇雨婷", text: "233333333333", timestamp: "2016/4/20 16:05", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"},
        {username: "胡顺昕", text: "啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈", timestamp: "2016/4/20 16:10", thumbImg: "/images/demo_thumb_image.jpeg"}];
    var data = {title: title, username: username, groupList: groupList, talkingList: talkingList}
    res.render('Index', {args: JSON.stringify(data)})
}