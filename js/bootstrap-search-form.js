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
    this.$element.parent().animate({ width: '+=' + this.options.increment }, 'fast');
    $target.css('visibility', 'hidden')
  }

  SearchField.prototype.collapse = function () {
    var $target = $(this.$element.data('toggle'))
    this.$element.parent().animate({ width: '-=' + this.options.increment }, 'fast');
    $target.css('visibility', 'visible')
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
    increment: 120
  }

  $.fn.searchField.Constructor = SearchField


 /* DATA-API DO CAMPO DE BUSCA.
  * =============== */

  $(function () {
    $('body').on('focus', '.form-search input[data-toggle]', function ( e ) {
      var $searchField = $(e.target)
      $searchField.searchField('expand')
    }).on('blur', '.form-search input[data-toggle]', function ( e ) {
      var $searchField = $(e.target)
      $searchField.searchField('collapse')
    })
  })

}(window.jQuery);
