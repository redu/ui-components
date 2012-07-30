!(function($) {

  'use strict';

  var methods = {

    init: function(options) {
      var settings = $.extend({
          'checkboxSelectedClass': 'table-checkbox-selected'
        }, options)

      return this.each(function() {
        var checkbox = $(this),
            row = checkbox.parents('tr')

        if (checkbox.is(':checked')) {
          row.addClass(settings.checkboxSelectedClass)
        }

        checkbox.on('change', function() {
          row.toggleClass(settings.checkboxSelectedClass)
        })
      })
    }
  }

  $.fn.reduTables = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('O método ' + method + ' não existe em jQuery.reduTables')
    }
  }

}) (window.jQuery)

$(function() {
  $('.form-checklist td input[type="checkbox"]').reduTables()
})
