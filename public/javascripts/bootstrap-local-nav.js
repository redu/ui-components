!(function($) {

  "use strict";

  var methods = {
    checkLabel: function(checkbox) {
      var label = checkbox.siblings("label")
      if (checkbox.prop("checked")) {
        label.addClass("local-nav-checked icon-confirm-green_16_18-after")
      } else {
        label.removeClass("local-nav-checked icon-confirm-green_16_18-after")
      }
    },

    init: function() {
      return this.each(function() {
        var localNav = $(this)

        localNav.find("li").click(function(e) {
          window.location = $(this).children("a").first().attr("href")
        })

        var checkboxes = localNav.find('input[type="checkbox"]')
        checkboxes.filter(":checked").each(function() {
          methods.checkLabel($(this))
        })

        checkboxes.change(function(e) {
          methods.checkLabel($(this))
        })
      })
    }
  }

  $.fn.localNav = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.localNav")
    }
  }

}) (window.jQuery)

$(function() {
  $(".local-nav").localNav();
})