!(function($) {

  "use strict";

  var methods = {

    toggleDropdown: function(listMixItem, openClass, listMixHeaderLegend, listMixInfoClass, listMixBody) {
      if (listMixItem.hasClass(openClass)) {
        listMixItem.removeClass(openClass)
        listMixHeaderLegend.css("visibility", "visible")
        listMixInfoClass.show()
      } else {
        listMixItem.addClass(openClass)
        listMixHeaderLegend.css("visibility", "hidden")
        listMixInfoClass.hide()
      }

      listMixBody.toggle(150, "swing");
    },

    listMix: function(options) {
      var settings = $.extend({
          "buttonDrownClass": "button-dropdown:not(.button-disabled)",
          "openClass": "open",
          "listMixBodyClass": "list-mix-body",
          "listMixHeaderLegend": "list-mix-header .legend",
          "listMixInfoClass": "list-mix-info"
        }, options)

      return this.each(function() {
        var listMix = $(this),
            listMixItems = listMix.children()

        listMixItems.each(function() {
          var listMixItem = $(this),
              buttonDropdown = listMixItem.find("." + settings.buttonDrownClass),
              listMixBody = listMixItem.find("." + settings.listMixBodyClass),
              listMixHeaderLegend = listMixItem.find("." + settings.listMixHeaderLegend),
              listMixInfoClass = listMixItem.find("." + settings.listMixInfoClass),
              listMixHeader = listMixItem.find(".list-mix-header")

          buttonDropdown.on("click", function() {
            methods.toggleDropdown(listMixItem, settings.openClass, listMixHeaderLegend, listMixInfoClass, listMixBody)
          })
        })
      })
    },

    init: function(options) {

    }

  }

  $.fn.reduList = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduList")
    }
  }

}) (window.jQuery)

$(function() {
  $(".list-mix").reduList("listMix")
})