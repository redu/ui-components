$(function() {
  var settings = {
    // Engloba todo o botão dropdown e formulário de login.
    buttonSignInWrapper: ".header-button-sign-in"
    // O botão dropdown.
  , buttonDropdown: ".dropdown-toggle"
    // O campo de login (logicamente deve ser o primeiro).
  , inputLogin: "input:text:first"
  }

  // Foca no primeiro campo (de login) quando o botão dropdown "Entrar no Redu" é aberto.
  $("body").on("click", settings.buttonSignInWrapper + " " + settings.buttonDropdown, function() {
    setTimeout(function() {
      $(settings.buttonSignInWrapper).find(settings.inputLogin).focus()
    }, 100)
  })
})