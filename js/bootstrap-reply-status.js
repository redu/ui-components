 // Responder status
$("a.reply-status, .cancel", ".statuses").live("click", function(e){
    e.preventDefault();
    $(this).parents("ul:first").next(".create-response").slideToggle(150, "swing");
    $(this).parents("ul:first").next(".create-response").find("textarea").focus();
});