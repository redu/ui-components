!(function($) {

  'use strict';

  var settings = {
    buttonDefault: 'button-default'
  , buttonPrimary: 'button-primary'
  , buttonDanger: 'button-danger'
  , buttonSuccess: 'button-success'
  , buttonDisabled: 'button-disabled'
  , linkSecondary: 'link-secondary'
  , spinnerHorizontalBlue: 'spinner-horizontal-blue'
  , spinnerCircularGray: 'spinner-circular-gray'
  , spinnerCircularBlue: 'spinner-circular-blue'
  , imgPath: 'img/'
  , spinnerCircularBlueGif: 'spinner-blue.gif'
  , spinnerCircularGrayGif: 'spinner-grey.gif'
  , spinnerCSS: {
      'display': 'inline-block'
    , 'vertical-align': 'middle'
    }
  }

  var methods = {
    // Verifica se o elemento tem alguma classe de botão.
    hasButtonClass: function($element) {
      return ($element.hasClass(settings.buttonDefault)
            || $element.hasClass(settings.buttonPrimary)
            || $element.hasClass(settings.buttonDanger)
            || $element.hasClass(settings.buttonSuccess))
    }

    // Chamado antes da requesição AJAX.
  , ajaxBefore: function(options) {
      settings = $.extend(settings, options)

      var $this = $(this)

      // Se for um formulário.
      if ($this.is('form')) {
        var $submit = $this.find('input:submit')
          , spinnerClass = settings.spinnerCircularGray

        if ($submit.hasClass(settings.buttonDefault)) {
          spinnerClass = settings.spinnerCircularBlue
        }

        $submit
          .addClass(spinnerClass)
          .prop('disabled', true)
          .data('spinnerClass', spinnerClass)
          .data('content', $submit.val())
          .css({ 'width': $submit.outerWidth(), 'height': $submit.outerHeight() })
          .val('')
      }

      // Se for um botão.
      if (methods.hasButtonClass($this)) {
        // Botão padrão usa o spinner azul e os outros cinza.
        var spinnerImg = settings.imgPath
        if ($this.hasClass(settings.buttonDefault)) {
          spinnerImg += settings.spinnerCircularBlueGif
        } else {
          spinnerImg += settings.spinnerCircularGrayGif
        }

        // Retorna as outras classes, que não a do botão.
        var otherClasses = function(classes) {
          var otherClasses = []

          classes = classes.split(' ')
          $.each(classes, function(index, value) {
            if (value !== settings.buttonDefault
                && value !== settings.buttonPrimary
                && value !== settings.buttonDanger
                && value !== settings.buttonSuccess
                && value !== '') {
              otherClasses.push(value)
            }
          })

          return otherClasses.join(' ')
        }

        var content = $this.html()
          , width = $this.outerWidth()
          , height = $this.outerHeight()
          , classes = otherClasses($this.attr('class'))
          , $spinner = $(document.createElement('img')).attr('src', spinnerImg).css(settings.spinnerCSS)

        $this
          .addClass(settings.buttonDisabled)
          .removeClass(classes)
          .data('content', content)
          .data('class', classes)
          .html($spinner)
          .css({'width': width, 'height': height})
      } else if ($this.is('a')) {
        // Link secundário usa o spinner horizontal azul, o normal usa o circular cinza.
        var linkSpinnerClass = settings.spinnerCircularGray
        if ($this.hasClass(settings.linkSecondary)) {
          linkSpinnerClass = settings.spinnerHorizontalBlue
        }

        $this.data('spinnerClass', linkSpinnerClass)
        $this.addClass(linkSpinnerClass)
      }
    }

    // Chamado depois da requisição AJAX.
  , ajaxComplete: function(options) {
      settings = $.extend(settings, options)

      var $this = $(this)

      if ($this.is('form')) {
        var $submit = $this.find('input:submit')

        $submit
          .removeClass($submit.data('spinnerClass'))
          .prop('disabled', false)
          .val($submit.data('content'))
      }

      // Se for um botão.
      if (methods.hasButtonClass($this)) {
        $this
          .removeClass(settings.buttonDisabled)
          .addClass($this.data('class'))
          .html($this.data('content'))
      } else if ($this.is('a')) {
        $this.removeClass($this.data('spinnerClass'))
      }
    }
  }

  $.fn.reduSpinners = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('O método ' + method + ' não existe em jQuery.reduSpinners')
    }
  }

}) (window.jQuery)

$(function() {
  $(document)
    .on('ajax:beforeSend', '[data-remote="true"]', function(xhr, settings) {
      $(this).reduSpinners('ajaxBefore')
    })
    .on('ajax:complete', '[data-remote="true"]', function(xhr, status) {
      $(this).reduSpinners('ajaxComplete')
    })
})
