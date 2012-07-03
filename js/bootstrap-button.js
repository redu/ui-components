$(function() { 
  //Desabilita href dos links com estilo de botão, quando no estado desabilidado.
  $(".button-disabled").live("click", function(e) {
    e.preventDefault()
  });  
}); 
