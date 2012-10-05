 // Responder status
$("a.reply-status, .cancel", ".statuses").live("click", function(e){
    e.preventDefault();
    var $lalala = $(this).parents("ul:first");
    $lalala.parents().next(".create-response").slideToggle(150, "swing");
    $lalala.parents().next(".create-response").find("textarea").focus();
});
