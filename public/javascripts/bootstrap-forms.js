!(function($) {

  "use strict"

  var methods = {

    optionList: function(options) {
        var settings = $.extend({
          "optionListCheckedClass": "option-list-checked",
          "optionListCheckbox": "option-list-checkbox",
          "textAreaClass": "input-area",
          "appendAreaClass": "append-area",
          "blue2": "#73C3E6"
        }, options)

      return this.each(function() {
        var optionList = $(this),
            textArea = optionList.children("." + settings.textAreaClass),
            appendArea = optionList.children("." + settings.appendAreaClass),
            checkbox = appendArea.children("." + settings.optionListCheckbox)

        textArea.height(appendArea.height())

        if (checkbox.prop("checked")) {
          optionList.addClass(settings.optionListCheckedClass)
        }

        checkbox.click(function() {
          if (checkbox.prop("checked")) {
            optionList.addClass(settings.optionListCheckedClass)
          } else {
            optionList.removeClass(settings.optionListCheckedClass)
          }
        })

        textArea.focus(function() {
          appendArea.css("border-color", settings.blue2)
        }).blur(function() {
          appendArea.css("border-color", "")
        })
      })
    },

    search: function(options) {
        var settings = $.extend({
          "iconMagnifierGray": "icon-magnifier-gray_16_18",
          "iconMagnifierLightBlue": "icon-magnifier-lightblue_16_18",
          "blue2": "#73C3E6"
        }, options)

      return this.each(function() {
        var form = $(this),
            input = form.children('input[type="text"]'),
            button = form.children('.button'),
            icon = button.children("span")

        input.focus(function() {
          icon.removeClass(settings.iconMagnifierGray)
          icon.addClass(settings.iconMagnifierLightBlue)
          button.css("border-color", settings.blue2)
        }).blur(function() {
          icon.removeClass(settings.iconMagnifierLightBlue)
          icon.addClass(settings.iconMagnifierGray)
          button.css("border-color", "")
        })

      })
    },

    // Adiciona/remove uma classe ao rótulo do controle que está em foco/fora de foco.
    focusLabel: function(element, controlLabelClass, inputFocusedClass, controlGroupClass) {
      var controlLabel = element.parents("." + controlGroupClass).children("." + controlLabelClass)

      element.focus(function() {
        controlLabel.addClass(inputFocusedClass)
      }).blur(function() {
        controlLabel.removeClass(inputFocusedClass)
      })
    },

    // Adiciona/remove uma classe ao rótulo do checkbox/radio quando está selecionado/desmarcado.
    darkenLabel: function(element, label, checkboxCheckedClass) {
      if (element.prop("checked")) {
        label.addClass(checkboxCheckedClass)
        label.siblings(".radio").removeClass(checkboxCheckedClass)
      } else {
        label.removeClass(checkboxCheckedClass)
      }
    },

    init: function(options) {
      var settings = $.extend({
          "controlLabelClass":    "control-label",    // Classe que identifica o rótulo de um controle.
          "inputFocusedClass":    "input-focused",    // Classe dada ao rótulo quando o controle está em foco.
          "charCountClass":       "character-count",  // Classe que identifica o contador de caracteres.
          "checkboxCheckedClass": "checkbox-checked", // Classe dada ao rótulo quando o controle está marcado.
          "controlGroupClass":    "control-group"     // Classe que identifica o container do controle.
        }, options)

      return this.each(function() {
        $(this).find('input[type="text"], input[type="file"], textarea, select').each(function() {
          methods.focusLabel($(this), settings.controlLabelClass, settings.inputFocusedClass, settings.controlGroupClass)
        })

        $(this).find('input[type="radio"], input[type="checkbox"]').each(function() {
          var input = $(this),
              label = input.parent()

          if (input.prop("checked")) {
            label.addClass(settings.checkboxCheckedClass)
          }

          input.change(function() {
            methods.darkenLabel(input, label, settings.checkboxCheckedClass)
          })
        })

        $(this).find('input[type="text"], textarea').each(function() {
          var input = $(this),
              hasMaxLength = input.attr("maxlength")

          // Verifica se maxlength está definido.
          if (typeof hasMaxLength != "undefined") {
            var charLengthWrapper = input.siblings("." + settings.charCountClass)

            charLengthWrapper.css("text-indent", "-9999px")
            input.focus(function(e) {
              charLengthWrapper.css("text-indent", "")
            }).blur(function(e) {
              charLengthWrapper.css("text-indent", "-9999px")
            }).keyup(function() {
              var charDifference = hasMaxLength - this.value.length,
                  text = charDifference + " caracteres restantes."

              if (charDifference === 1) {
                text = "1 caracter restante."
              } else if (charDifference <= 0) {
                text = "Nenhum caracter restante."
                // No IE o maxlength não funciona para as áreas de texto.
                input.text(input.text().substring(0, hasMaxLength))
              }

              charLengthWrapper.text(text)
            })
          }
        })
      })
    }

  }

  $.fn.reduForm = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduForm")
    }
  }

}) (window.jQuery)

$(function() {
  $("form:not(.form-search)").reduForm()
  $(".form-search").reduForm("search")
  $(".option-list").reduForm("optionList")

  // Chamada para o placeholder_polyfill.
  if ('placeholder' in $('<input>')[0]) {
    // don't run the polyfill when the browser has native support
    return;
  }
  $('input[placeholder], textarea[placeholder]').placeHolder({
    visibleToScreenreaders : true, // set to false if the content of the placeholder is useless or doubling the content of the label
    hideOnFocus : false // set to false if you want to mimic the behavior of mobile safari and chrome (remove label when typeed instead of onfocus)
  });
})