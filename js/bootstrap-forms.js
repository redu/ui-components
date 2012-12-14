!(function($) {

  "use strict";

  var methods = {

    // Adiciona um contador de caracteres.
    countChars: function(options) {
      var settings = $.extend({
        characterCounterTemplate: $('<span class="character-counter legend"></span>')
      }, options);

      return this.each(function() {
        var control = $(this)
          , controls = control.parent()
          , maxLength = control.attr('maxlength')
          , remainingCharsText = function(charCount) {
            var charDifference = maxLength - charCount

            if (charDifference <= 0) {
              if (control.is('textarea')) {
                // No IE o maxlength não funciona para as áreas de texto.
                control.text(control.text().substring(0, maxLength))
              }

              return 'Nenhum caracter restante.'
            } else if (charDifference === 1) {
              return '1 caracter restante.'
            } else {
              return charDifference + ' caracteres restantes.'
            }
          }

        control.on({
          focusin: function() {
            settings.characterCounterTemplate.text(remainingCharsText(control.val().length))
            settings.characterCounterTemplate.appendTo(controls)
          }
        , focusout: function() { settings.characterCounterTemplate.remove() }
        , keyup: function() { settings.characterCounterTemplate.text(remainingCharsText(control.val().length)) }
        })
      })
    },

    // Adições/remoções de classes para o controle lista de opções.
    optionList: function(options) {
        var settings = $.extend({
          optionListCheckedClass: 'control-option-list-checked'
        , optionListCheckbox: 'control-option-list-checkbox'
        , textAreaClass: 'input-area'
        , appendAreaClass: 'control-append-area'
        , blue2: '#73C3E6'
        }, options)

      return this.each(function() {
        var optionList = $(this)
          , textArea = optionList.children('.' + settings.textAreaClass)
          , appendArea = optionList.children('.' + settings.appendAreaClass)
          , checkbox = appendArea.children('.' + settings.optionListCheckbox)


        // Adiciona a classe optionListCheckedClass quando o checkbox estiver marcardo.

        if (checkbox.prop('checked')) {
          optionList.addClass(settings.optionListCheckedClass)
        }

        checkbox.on('click', function() {
          optionList.toggleClass(settings.optionListCheckedClass)
        })

        // Adiciona a borda blue2 ao botão quando o textarea está em foco.
        textArea.on({
          focusin: function() { appendArea.css('border-color', settings.blue2) }
        , focusout: function() { appendArea.css('border-color', '') }
        })
      })
    },

    // Adições/remoções de classes para o formulário de busca.
    search: function(options) {
        var settings = $.extend({
          iconMagnifierGray: 'icon-magnifier-gray_16_18'
        , iconMagnifierLightBlue: 'icon-magnifier-lightblue_16_18'
        , blue2: '#73C3E6'
        , controlAreaClass: 'control-area'
        , controlAppendAreaClass: 'control-append-area'
        , searchIconClass: 'control-search-icon'
        }, options)

      return this.each(function() {
        var form = $(this)
          , control = form.children('.' + settings.controlAreaClass)
          , button = form.children('.' + settings.controlAppendAreaClass)
          , icon = button.children('.' + settings.searchIconClass)

        control.on({
          focusin: function() {
            icon.removeClass(settings.iconMagnifierGray)
            icon.addClass(settings.iconMagnifierLightBlue)
            button.css('border-color', settings.blue2)
          }
        , focusout: function() {
            icon.removeClass(settings.iconMagnifierLightBlue)
            icon.addClass(settings.iconMagnifierGray)
            button.css('border-color', '')
          }
        })
      })
    },

    // Adiciona/remove a classe indicativa de controle em foco.
    toggleFocusLabel: function(options) {
      var settings = $.extend({
        // Classe adicionada quando o controle está me foco.
        controlFocusedClass: 'control-focused'
        // Classe que identifica o container do controle.
      , controlGroupClass: 'control-group'
      }, options)

      $(this).parents('.' + settings.controlGroupClass).toggleClass(settings.controlFocusedClass)
    },

    // Adiciona/remove uma classe ao rótulo do checkbox/radio quando está selecionado/desmarcado.
    darkLabel: function(options) {
      var settings = $.extend({
        // Classe adicionada quando o controle está marcado.
        controlCheckedClass: 'control-checked'
        // Classe que identifica um radio button.
      , radioClass: 'radio'
      , darkenLabel: function(label) {
          label.toggleClass(settings.controlCheckedClass)
          label.siblings('.' + settings.radioClass).removeClass(settings.controlCheckedClass)
        }
      }, options)

      return this.each(function() {
        var control = $(this)
          , label = control.parent()

        if (control.prop('checked')) { label.addClass(settings.controlCheckedClass) }

        control.on('change', function() { settings.darkenLabel(label) })
      })
    },

    // Ajusta a altura do textarea de acordo com seu atributo rows.
    resizeByRows: function(options) {
      return this.each(function() {
        var $textarea = $(this)
          , rowsTemp = $textarea.attr('rows')
          , rows = (rowsTemp !== '' ? parseInt(rowsTemp, 10) : 0)

        if (rows !== 0) {
          var pxToInt = function(value) {
            if (typeof value !== 'undefined') {
              return parseInt(value.replace('px', ''), 10)
            } else {
              return 0;
            }
          }

          var lineHeight = pxToInt($textarea.css('line-height'))
            , borderTop = pxToInt($textarea.css('border-top-width'))
            , borderBottom = pxToInt($textarea.css('border-bottom-width'))
            , marginTop = pxToInt($textarea.css('margin-top'))
            , marginBottom = pxToInt($textarea.css('margin-bottom'))
            , paddingTop = pxToInt($textarea.css('padding-top'))
            , paddingBottom = pxToInt($textarea.css('padding-bottom'))

          $textarea.height((rows * lineHeight) + borderTop + borderBottom + marginTop + marginBottom + paddingTop + paddingBottom)
        }
      })
    },

    styleInputFile: function(options) {
      var settings = $.extend({
        buttonDefault: 'button-default'
      , buttonText: 'Escolher arquivo'
      , filePath: 'control-file-text'
      , filePathText: 'Nenhum arquivo selecionado.'
      , wrapper: 'control-file-wrapper'
      }, options)

      return this.each(function() {
        var $input = $(this).css('opacity', 0)
          , inputVal = $input.val()
          , $button = $(document.createElement('a')).addClass(settings.buttonDefault).text(settings.buttonText)
          , $filePath = $(document.createElement('span')).addClass(settings.filePath).text(settings.filePathText)
          , $wrapper = $(document.createElement('div')).addClass(settings.wrapper).append($button).append($filePath)
          , $controlParent = $input.parent()

        $wrapper.appendTo($controlParent)
        // Ajusta a altura do pai.
        $controlParent.height($wrapper.height())

        // No FF, se um arquivo for escolhido e der refresh, o input mantém o valor.
        if (inputVal !== '') {
          $filePath.text(inputVal)
        }

        // Repassa o clique pro input file.
        $button.on('click', function(e) {
          e.preventDefault
          $input.trigger('click')
        })

        // Repassa o nome do arquivo para o span.
        $input.on('change', function() {
          var value = $input.val()

          if (value === '') {
            value = settings.filePathText
          } else {
            // Remove o 'C:\fakepath\' que alguns navegadores adicionam.
            value = value.replace('C:\\fakepath\\', '')
          }

          $filePath.text(value)
        })
      })
    },

    init: function() {}
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
  $('input[type="text"][maxlength], input[type="password"][maxlength], textarea[maxlength]').reduForm('countChars');

  $(document).on('focus blur', 'input[type="text"], input[type="password"], input[type="file"], textarea, select', function(e) {
    $(this).reduForm('toggleFocusLabel')
  })

  $('input[type="radio"], input[type="checkbox"]').reduForm('darkLabel')

  $(".form-search").reduForm("search")

  $('.control-option-list').reduForm('optionList')

  $('textarea[rows]').reduForm('resizeByRows')

  $('input[type="file"]').reduForm('styleInputFile')

  // Plugins.

  $('textarea').autosize()

  placeHolderConfig = {
    // Nome da classe usada para estilizar o placeholder.
    className: 'placeholder'
    // Mostra o texto do placeholder para leitores de tela ou não.
  , visibleToScreenreaders : false
    // Classe usada para esconder visualmente o placeholder.
  , visibleToScreenreadersHideClass : 'placeholder-hide-except-screenreader'
    // Classe usada para esconder o placeholder de tudo.
  , visibleToNoneHideClass : 'placeholder-hide'
    // Ou esconde o placeholder no focus ou na hora de digitação.
  , hideOnFocus : false
    // Remove esta classe do label (para consertar labels escondidos).
  , removeLabelClass : 'visuallyhidden'
    // Substitui o label acima com esta classe.
  , hiddenOverrideClass : 'visuallyhidden-with-placeholder'
    // Permite a substituição do removeLabelClass com hiddenOverrideClass.
  , forceHiddenOverride : true
    // Aplica o polyfill até mesmo nos navegadores com suporte nativo.
  , forceApply : false
    // Inicia automaticamente.
  , autoInit : true
  }
})
