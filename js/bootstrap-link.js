!(function($) {

  "use strict";

  var methods = {

    init: function(options) {
      var settings = $.extend({
          "linkTargetClass": "link-target"
        }, options)

      return this.each(function() {
        var container = $(this)
          , link = container.find("." + settings.linkTargetClass)

          container.live("click", function() {
            window.location = link.attr("href")
          })
        })
      }

  }

  $.fn.reduLinks = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduLinks")
    }
  }

}) (window.jQuery)

$(function() {
  $(".link-container").reduLinks()
})