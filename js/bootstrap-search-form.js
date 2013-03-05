!function ($) {

  "use strict"; // jshint ;_;


 /* DEFINIÇÃO DE CLASSE DO CAMPO DE BUSCA.
  * ============================== */

  var SearchField = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.searchField.defaults, options)
  }

  SearchField.prototype.expand = function () {
    var $target = $(this.$element.data('toggle'))
      , isFocused = this.$element.data('isFocused')

    if (!isFocused) {
      this.$element.parent().animate({ width: '+=' + this.options.increment }, 'fast');
      $target.hide()
      this.$element.data('isFocused', true)
    }
  }

  SearchField.prototype.collapse = function () {
    var $target = $(this.$element.data('toggle'))
      , isFocused = this.$element.data('isFocused')

    if (isFocused) {
      this.$element.parent().animate({ width: '-=' + this.options.increment }, 'fast');
      $target.show()
      this.$element.data('isFocused', false)
    }
  }


 /* DEFINIÇÃO DO PLUGIN DO CAMPO DE BUSCA.
  * ======================== */

  $.fn.searchField = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('searchField')
        , options = typeof option == 'object' && option
      if (!data) $this.data('searchField', (data = new SearchField(this, options)))
      if (option == 'expand') data.expand()
      else if (option == 'collapse') data.collapse()
    })
  }

  $.fn.searchField.defaults = {
    increment: 100
  }

  $.fn.searchField.Constructor = SearchField


 /* DATA-API DO CAMPO DE BUSCA.
  * =============== */

  $(function () {
    $('body')
      .on('focusin', '.form-search-expandable', function ( e ) {
        var $searchField = $(e.target)

        if ($searchField.hasClass('control-area')) {
          $searchField.searchField('expand')
        }
      })
      .on('focusout', '.form-search-expandable', function ( e ) {
        var $searchField = $(e.target)

        if ($searchField.hasClass('control-area')) {
          $searchField.searchField('collapse')
        }
      })
      .on("keypress", ".form-search-filters .control-area", function(e) {
        // Submete o formulário quando o Enter é pressionado ao invés de abrir o dropdown.
        if (e.which == 13) {
          $(this).closest('.form-search-filters').submit();
          return false;
        }
      })
  })

}(window.jQuery);