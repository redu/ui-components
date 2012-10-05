 // Responder status
$("a.reply-status, .cancel").live("click", function(e){
    e.preventDefault();

    var $createResponse = $(this).parents("ul:first").next(".create-response");

    $createResponse.slideToggle(150, "swing");
    $createResponse.find("textarea").focus();
});
