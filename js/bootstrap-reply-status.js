 // Responder status
$(".status-buttons a.reply-status").live("click", function(e){
    e.preventDefault();

    var $createResponse = $(this).parents("ul:first").next(".create-response");

    $createResponse.slideToggle(150, "swing");
    $createResponse.find("textarea").focus();
});

// Cancelar Publicação
$(".status-buttons a.cancel").live("click", function(e){
    e.preventDefault();

    var $createResponse = $(this).parents(".create-response");

    $createResponse.slideToggle(150, "swing");
});

$(function() {
  // Expandir o form para criação de status
  $(".create-status .status-buttons").hide();

  $(".create-status textarea").live("focus", function(e){
    $(this).parents("form").find(".status-buttons").slideToggle(150, "swing");
     $(this).parents("form").find("textarea").css("height","122");
  });

  $(".create-status .status-buttons .cancel").live("click", function(){
    $(this).parents("form").find(".status-buttons").slideToggle(150, "swing");
     $(this).parents("form").find("textarea").css("height","32");
  });
})