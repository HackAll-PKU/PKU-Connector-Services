/**
 * Created by ChenLetian on 16/4/28.
 */
$(document).ready(function () {
    $("input#search_input")
        .focus(function () {
            $("span.placeholder").hide();
        })
        .blur(function () {
            if ($(this)[0].value == "")
                $("span.placeholder").show();
        });
});