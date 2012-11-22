// Exibir todos os comentários
$(".responses .see-more").live("click", function(e){
    var $this = $(this);
    var $responses = $this.parents(".responses");

    e.preventDefault();
    // Exibe todos as respostas
    $responses.find("li").slideDown(150, 'swing');
    // Remove a opção de exibir todas as respostas
    $this.parent().remove();
    // Troca o texto para informar ao usuário que ele está visualizando todas as respostas
    $responses.find(".last-responses").html("Visualizando todas as respostas...");
});

// Exibe área de criação de respostas
$(".actions .reply-status span").live("click", function(e){
  var $this = $(this);

  $this.parents(".subject-content").find(".create-response").slideDown(150, 'swing');
});

// Esconde formulário para criação de respostas
$(".create-response .status-buttons .cancel").live("click",function(e){
  var $this = $(this);

  $this.parents(".create-response").slideUp(150, 'swing');
});

// Expande o text-area para a criação de status
$(".create-status textarea").live("click",function(e){
  var $textArea = $(this);
  var $button = $textArea.parent().find(".status-buttons");

  $textArea.animate({ height: 136 }, 150);
  $button.slideDown(150, "swing");
})

// Cancelar a criação de status
$(".create-status .status-buttons .cancel").live("click", function(e){
  e.preventDefault()
  var $this = $(this);

  $this.parents(".status-buttons").slideUp(150, 'swing');
  $this.parents("form").find("textarea").animate({ height: 30 }, 150);
})

// Agrupa respostas
$.fn.groupResponses = function(opts){
  return this.each(function(){
    var $this = $(this);
    var options = {
      maxResponses : 3
    }
    $.extend(options, opts)

    var $responses = $this.find("li:not(.show-responses)");
    if ($responses.length > options.maxResponses) {
      $responses.filter(":lt(" + ($responses.length - options.maxResponses) + ")").hide();
      $(this).find(".show-responses").show();
    }
  });
}

// Agrupa membros
$.fn.groupMembers = function(opts){
  return this.each(function(){
    var $this = $(this);
    var options = {
      elementWidth : 34,
      elementHeight : 40
    }
    $.extend(options, opts)

    var $elements = $this.find("li");
    var width = $this.width();
    var newHeight = (Math.ceil((($elements.length * options.elementWidth) /  width)) *  options.elementHeight);

    // Exibe os elementos agrupados
    $(".log .see-all").live("click",function(e) {
      $this.animate({ height: newHeight }, 150);
      $(this).remove();
    });
  })
}

//Conta a quantidade de respostas de um post
$.fn.countComments = function(){
  return this.each(function(){
    var $this = $(this);
    var quantity = $this.find(".response").length;
    $this.find(".see-more .count").html(quantity);
  });
};

$(function() {
  $('.responses').groupResponses();
  $('.grouping-elements').groupMembers();
  $(".responses").countComments();
});



