 // Responder status
$("a.reply-status, .cancel").live("click", function(e){
    e.preventDefault();

    var $thais = $(this).parents("ul:first");

    $thais.parents().next(".create-response").slideToggle(150, "swing");
    $thais.parents().next(".create-response").find("textarea").focus();
});
