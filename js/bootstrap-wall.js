// Exibir todos os comentários
$(".responses .see-more").live("click", function(e){
    var $this = $(this);
    var $responses = $this.parents(".responses");

    e.preventDefault();
    // Exibe todos as respostas
    $responses.find("li").slideDown(150, 'swing');
    // Remove a opção de exibir todas as respostas
    $this.parent().remove();
    // Troca o texto informando ao usuário que está visualizando todas as respostas
    $responses.find(".last-responses").html("Visualizando todas as respostas...");
});

// Exibe área de criação de respostas
$(".actions .reply-status").live("click", function(e){
  var $this = $(this);

  e.preventDefault()

  $this.parents(".subject-content").find(".create-response").slideDown(150, 'swing');

});

// Cancela a criação de respostas
$(".status-buttons .cancel").live("click",function(e){
  var $this = $(this);
  e.preventDefault()

  $this.parents(".create-response").slideUp(150, 'swing');
});

// Expansão do text-area para a criação de status
$(".create-status textarea").live("click",function(e){

  var $textArea = $(this);
  var $button = $textArea.parent().find(".status-buttons");

  $textArea.css("height",'122').slideDown(150,"swing");
  $button.slideDown(150, "swing");
})

// Cancelar a criação de status
$(".create-status .status-buttons .cancel").live("click", function(e){
  e.preventDefault()

  var $this = $(this);

  $this.parents(".status-buttons").slideUp(150, 'swing');

  $this.parents("form").find("textarea").css("height","30");
})


$(function() {
  // Agrupar respostas
  $('.responses').each(function() {
    var $responses = $(this).find("li:not(.show-responses)");
    if ($responses.length > 3) {
      $responses.filter(":lt(" + ($responses.length - 3) + ")").hide();
      $(this).find(".show-responses").show();
    }
  })

  // Agrupar membros
  $('.grouping-elements').each(function() {
    var $this = $(this);
    var $elements = $this.find("li");
    var width = $this.width();
    var newHeight = (Math.ceil((($elements.length * 35) /  width)) *  40);

    // Exibi os elementos agrupados
    $(".log .see-all").live("click",function(e) {
      e.preventDefault()

      $this.css("height", newHeight);
      $elements.slideDown(150, 'swing');
      $(this).remove()
    });
  })
});



