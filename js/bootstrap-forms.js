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
          , $filePath = $(document.createElement('span')).addClass(settings.filePath).text($input.data('legend') || settings.filePathText)
          , $wrapper = $(document.createElement('div')).addClass(settings.wrapper).append($button).append($filePath)
          , $controlParent = $input.parent()

        $wrapper.appendTo($controlParent)
        // Ajusta a altura.
        $input.height($wrapper.height())

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

    // Encontra o label correspondente de um checkbox/radio.
    findLabel: function($control) {
      // Primeiro tenta o label que encapsula o controle.
      var $label = $control.closest('label')
        , controlId = $control.attr('id')

      // Depois tenta achar o label se ele estiver ligado por controle[id] e label[for].
      if (typeof controlId !== 'undefined') {
        var $possibleLabel = $('label[for="' + controlId + '"]')

        if ($possibleLabel.length === 1) {
          $label = $possibleLabel
        }
      }

      return $label
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


  // Comportamento de escurer texto do checkbox/radio selecionado.

  var reduFormRadioCheckboxSettings = {
    // Classe adicionada quando o controle está marcado.
    controlCheckedClass: 'control-checked'
  }

  $(document).on('change', 'input:radio, input:checkbox', function(e) {
    var $control = $(this)
      , $label = $.fn.reduForm('findLabel', $control)

    if ($label.length > 0) {
      $label.toggleClass(reduFormRadioCheckboxSettings.controlCheckedClass)

      // Se for um radio.
      if ($control.is('input:radio')) {
        // Procura o label dos outros radios para remover a classe.
        var $form = $control.closest('form')
          , controlName = $control.attr('name')
          , $otherControls = $form.find('[name="' + controlName + '"]:radio').filter(function(index) {
              return this !== $control[0]
            })

        $otherControls.each(function() {
          var $control = $(this)
            , $label = $.fn.reduForm('findLabel', $control)

          $label.removeClass(reduFormRadioCheckboxSettings.controlCheckedClass)
        })
      }
    }
  })

  // Caso de refresh da página o checkbox/radio marcado.
  $('input:radio, input:checkbox').each(function() {
    var $control = $(this)
      , $label = $.fn.reduForm('findLabel', $control)

    if ($control.prop('checked')) {
      $label.addClass(reduFormRadioCheckboxSettings.controlCheckedClass)
    }
  })


  // No elemento de opção com texto e formulários de busca, quando o campo ou
  // área de texto estiverem selecionados, mudar a cor da borda e os ícones dos
  // botões de cinza para azul. O inverso acontece quando deselecionado.
  var colorBlue2 = '#73C3E6'
    , selectorControlArea = '.control-area.area-infix'
    , classesFixedArea = '.area-suffix, .form-search-filters-button'
    , classIcon = "[class^='icon-'],[class*=' icon-']"
  $(document)
    .on('focusin', selectorControlArea, function(e) {
      var $fixedAreas = $(this).parent().find(classesFixedArea)
        , $buttonsIcons = $fixedAreas.find(classIcon)
      // Troca a cor da borda.
      $fixedAreas.css('border-color', colorBlue2);

      // Troca a cor do ícone.
      $buttonsIcons.each(function() {
        var $button = $(this)
          , iconClasses = findIconClasses($button.attr('class'))
        $button
          .removeClass(iconClasses)
          .addClass(iconClasses.replace('gray', 'lightblue'))
      })
    })
    .on('focusout', selectorControlArea, function(e) {
      var $fixedAreas = $(this).parent().find(classesFixedArea)
        , $buttonsIcons = $fixedAreas.find(classIcon)
      // Troca a cor da borda.
      $fixedAreas.css('border-color', '');

      // Troca a cor do ícone.
      $buttonsIcons.each(function() {
        var $button = $(this)
          , iconClasses = findIconClasses($button.attr('class'))
        $button
          .removeClass(iconClasses)
          .addClass(iconClasses.replace('lightblue', 'gray'))
      })
    })
    .on('change', '.form-search-filters input:radio', function(e) {
      var $radio = $(this)
        , $legendIcon = $radio.siblings('.legend')
        , newIconClass = findIconClasses($legendIcon.attr('class'))
        , $buttonIcon = $radio.closest('.form-search-filters').find('.form-search-filters-button .control-search-icon')
        , currentIconClass = findIconClasses($buttonIcon.attr('class'))

      $buttonIcon.removeClass(currentIconClass).addClass(newIconClass.replace('-before', ''))
    })

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
