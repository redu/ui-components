!(function($) {

  'use strict';

  var classes = {
    // Wrapper.
    modal: 'modal'
    // Conteúdo.
  , modalBody: 'modal-body'
    // Seta.
  , scrollArrow: 'modal-scroll-arrow'
  }

  var methods = {
    // Usado para conseguir o tamanho de um elemento com display none.
    displayHidden: function($element) {
      var wasVisible = true

      if ($element.css('display') === 'none') {
        $element.css({
          'visibility': 'hidden'
        , 'display': 'block'})
        wasVisible = false
      }

      return wasVisible
    }

    // Retorna o elemento para display none.
  , displayVisible: function($element) {
      $element.css({
        'visibility': 'visible'
      , 'display': 'none'})
    }

  , fitContent: function($modal, settings) {
    var $modalBody = $modal.find('.' + classes.modalBody)
      , modalTop = parseInt($modal.css('top'), 10)
      , wasVisible

    wasVisible = methods.displayHidden($modal)

    // O novo tamanho do corpo é: tamanho atual + (altura visível do navegador - espaçamento inferior - topo do modal - altura do modal)
    var newHeight = $modalBody.height() + $(window).height() - settings.bottomMargin - modalTop - $modal.height() + "px"

    var innerHeight = $modalBody[0].scrollHeight - (parseInt($modalBody.css('padding-top'), 10) + parseInt($modalBody.css('padding-bottom'), 10))

    if (innerHeight <= parseInt(newHeight, 10)) {
      newHeight = innerHeight
    }

    $modalBody.css('max-height', newHeight)
    $modalBody.css('height', newHeight)

    if (!wasVisible) {
      methods.displayVisible($modal)
    }
  }

    // Preenche verticalmente a janela modal.
  , fillHeight: function(options) {
      var settings = $.extend({
          // Margem inferior.
          bottomMargin: 20
        }, options)

      return this.each(function() {
        var $modal = $(this)
        $modal.on('fitContent.redu', function(e) {
          methods.fitContent($modal, settings)
        })
        $modal.trigger('fitContent.redu')
      })
    }

    // Verifica se um elemento apresenta a barra de scroll vertical.
  , hasScrollBar: function($element) {
      var element = $element.get(0)
      return (element.scrollHeight > element.clientHeight)
    }

    // Controla a seta mostrada quando há barra de scroll vertical.
  , scrollArrow: function(options) {
      var settings = $.extend({
        // Caractere simbolizando uma seta para cima.
        arrowUp: '↑'
        // Caractere simbolizando uma seta para baixo.
      , arrowDown: '↓'
        // Largura da seta.
      , arrowWidth: 9
      }, options)

      return this.each(function() {
        var $modalBody = $(this)
          , $modal = $modalBody.parent('.' + classes.modal)

        methods.displayHidden($modal)

        if (methods.hasScrollBar($modalBody)) {
          var $scrollArrow =
                $(document.createElement('span'))
                  .addClass(classes.scrollArrow)
                  .html(settings.arrowDown)
            , modalBodyOffset = $modalBody.offset()
            , margin = (parseInt($modalBody.css('padding-left'), 10) - settings.arrowWidth) / 2
            , arrowUpPosition = modalBodyOffset.top - $(window).scrollTop() + 5
            , arrowDownPosition = arrowUpPosition + $modalBody.height()

          $scrollArrow.css({
            'top': arrowDownPosition
          , 'left': modalBodyOffset.left + margin
          })

          $modalBody.append($scrollArrow)
          $modalBody.scroll(function() {
            var scrollTop = $modalBody.scrollTop()

            if (scrollTop === 0) {
              // Barra de rolagem no topo, exibe seta para baixo.
              $scrollArrow.css('top', arrowDownPosition).html(settings.arrowDown)
            } else if (scrollTop + $modalBody.innerHeight() >= $modalBody.get(0).scrollHeight) {
              // Barra de rolagem no fundo, exibe seta para cima.
              $scrollArrow.css('top', arrowUpPosition).html(settings.arrowUp)
            }
          })
        }

        methods.displayVisible($modal)
      })
    }
  }

  $.fn.reduModal = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('O método ' + method + ' não existe em jQuery.reduModal')
    }
  }

}) (window.jQuery)

$(function() {
  $('.modal').reduModal('fillHeight')
  $('.modal-scroll').reduModal('scrollArrow')
})
