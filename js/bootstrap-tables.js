!(function($) {

  "use strict";

  var methods = {

    // Altera o estado de seleção da linha do checkbox.
    toggleState: function(options) {
      var settings = $.extend({}, $.fn.reduTables.defaults, options)

      var $checkbox = $(this)
        , $row = $checkbox.closest("tr")
        , $form = $checkbox.closest(settings.selectors.form)

      $row.toggleClass(settings.classes.checkboxSelected)
      $form.trigger("verifySubmit")

      return $checkbox
    }

    // Verifica se o botão de submissão deve ser ativado ou não.
  , verifySubmit: function(options) {
    var settings = $.extend({}, $.fn.reduTables.defaults, options)

    var $form = $(this)
      , $submit = $form.find('input[type="submit"]')
      , $checkboxes = $form.find('input[type="checkbox"]')

    $checkboxes.each(function() {
      var $checkbox = $(this)

      // Se o checkbox foi selecionado, abilita o submit.
      if ($checkbox.is(":checked")) {
        $submit.removeAttr("disabled")
        return false
      } else {
        // Se foi o último a ser desmarcado, desabilita o submit.
        if ($checkboxes.filter(":checked").length === 0) {
          $submit.attr("disabled", "disabled")
        }
      }
    })

    return $form
  }

  , init: function(options) {

    }
  }

  $.fn.reduTables = function(method) {
    if (methods[method]) {
      return methods[method].apply(this,
        Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduTables")
    }
  }

  $.fn.reduTables.defaults = {
    classes: {
      checkboxSelected: "table-checkbox-selected"
    }
  , selectors: {
      form: ".form-checklist"
    }
  }

  $(function() {
    var checkboxSelector = $.fn.reduTables.defaults.selectors.form +
        ' td input[type="checkbox"]'
      , $submit = $($.fn.reduTables.defaults.selectors.form +
        ' input[type="submit"]').attr("disabled", "disabled")
      , enableSubmit = false

    $(document)
      .on("change", checkboxSelector, function(e) {
        $(this).reduTables("toggleState")
      })
      .on("verifySubmit", $.fn.reduTables.defaults.selectors.form,
        function(e) {
        $(this).reduTables("verifySubmit")
      })

    // FF caches os checkboxes selecionados após o page refresh.
    $(checkboxSelector).filter(":checked").each(function() {
      $(this).reduTables("toggleState")
      enableSubmit = true
    })

    if (enableSubmit) {
      $submit.removeAttr("disabled")
    }
  })

}) (window.jQuery)