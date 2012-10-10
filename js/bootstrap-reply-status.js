 // Responder status
$("a.reply-status").live("click", function(e){
    e.preventDefault();

    var $createResponse = $(this).parents("ul:first").next(".create-response");

    $createResponse.slideToggle(150, "swing");
    $createResponse.find("textarea").focus();
});

// Cancelar Publicação
$("a.cancel").live("click", function(e){
    e.preventDefault();

    var $createResponse = $(this).parents(".create-response");

    $createResponse.slideToggle(150, "swing");
});

// Expandir o form para criação de status
$(".status-buttons").hide();

$(".create-status textarea").live("focus", function(e){
  $(this).parents("form").find(".status-buttons").fadeIn();
});

$(".create-status .status-buttons .cancel").live("click", function(){
  $(this).parents("form").find(".status-buttons").fadeOut();
});
