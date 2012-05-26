!(function($) {

  "use strict"

  var methods = {

    init: function(options) {
      return this.each(function() {
        var items = $(this).children("li")

        items.each(function() {
          var item = $(this),
              link = item.children("a:first")

          item.live("click", function() {
            window.location = link.attr("href")
          })
        })
      })
    }

  }

  $.fn.reduHeaderList = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduHeaderList")
    }
  }

}) (window.jQuery)

$(function() {
  $(".header-list").reduHeaderList()
})