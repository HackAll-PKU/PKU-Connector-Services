/**
 * Created by ChenLetian on 16/4/28.
 */
$(document).ready(function () {
    $("input#search_input").focus(function () {
        //$("span.placeholder").text("");
        $("span.placeholder")[0].style.visibility = "hidden";
    });
    $("input#search_input").blur(function () {
        //$(this).val("");
        if ($(this)[0].value == "")
            $("span.placeholder")[0].style.visibility = "visible";
            //$("span.placeholder").text("searching");
    });
})