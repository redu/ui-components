!(function($) {

  'use strict';

  var methods = {
    init: function(options) {
      var settings = $.extend({
        buttonDefault: 'button-default'
      , buttonPrimary: 'button-primary'
      , buttonDanger: 'button-danger'
      , buttonSuccess: 'button-success'
      , buttonDisabled: 'button-disabled'
      , linkSecondary: 'link-secondary'
      , spinnerHorizontalBlue: 'spinner-horizontal-blue'
      , spinnerCircularGray: 'spinner-circular-gray'
      , imgPath: 'img/'
      , spinnerCircularBlueGif: 'spinner-blue.gif'
      , spinnerCircularGrayGif: 'spinner-grey.gif'
      , spinnerCSS: {
          'display': 'inline-block'
        , 'vertical-align': 'middle'
        }
      }, options)

      return this.each(function() {
        var $element = $(this)

        // Se for um botão.
        if ($element.hasClass(settings.buttonDefault)
            || $element.hasClass(settings.buttonPrimary)
            || $element.hasClass(settings.buttonDanger)
            || $element.hasClass(settings.buttonSuccess)) {
          // Botão padrão usa o spinner azul e os outros cinza.
          var spinner = settings.imgPath + settings.spinnerCircularGrayGif
          if ($element.hasClass(settings.buttonDefault)) {
            spinner = settings.imgPath + settings.spinnerCircularBlueGif
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

          $element.on({
            ajaxSend: function(e, request, options) {
              var button = $(this)
                , content = button.html()
                , width = button.outerWidth()
                , height = button.outerHeight()
                , classes = otherClasses(button.attr('class'))
                , $spinner = $(document.createElement('img')).attr('src', spinner).css(settings.spinnerCSS)

              button
                .addClass(settings.buttonDisabled)
                .removeClass(classes)
                .data('content', content)
                .data('class', classes)
                .html($spinner)
                .css({'width': width, 'height': height})
            }
          , ajaxComplete: function(e, request, options) {
              var button = $(this)
                , content = button.data('content')
                , classes = button.data('class')

              button
                .removeClass(settings.buttonDisabled)
                .addClass(classes)
                .html(content)
            }
          })
        }

        // Se for um link de texto.
        if ($element.is('a')) {
          // Link secundário usa o spinner horizontal azul e os outros circular cinza.
          var spinnerClass = settings.spinnerCircularGray
          if ($element.hasClass(settings.linkSecondary)) {
            spinnerClass = settings.spinnerHorizontalBlue
          }
          
          $element.on({
            ajaxSend: function(e, request, options) {
              $(this).addClass(spinnerClass)
            }
          , ajaxComplete: function(e, request, options) {
              $(this).removeClass(spinnerClass)
            }
          })
        }
      })
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
  $('[data-remote=true]').reduSpinners()
})