/**
 * Created by ChenLetian on 16/4/28.
 */
$(document).ready(function() {
    $("input#search_input").focus(function() {
        $("span.placeholder").text("");
    });
    $("input#search_input").blur(function() {
        $(this).val("");
        $("span.placeholder").text("searching");
    });
})