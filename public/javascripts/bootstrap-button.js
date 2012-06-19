$(function() { 
  //Desabilita href dos links com estilo de botão, quando no estado desabilidado.
  $("a.disabled").live("click", function(e) {
    e.preventDefault()
  });  
}); 
