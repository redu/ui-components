!(function($) {

  "use strict";

  var methods = {

    // Expande/colapsa o dropdown.
    // Esconde a legenda, notificações e mostra a lista de disciplinas.
    toggleDropdown: function(options) {
      var settings = $.extend({}, $.fn.reduList.defaults, options)

      var $dropdown = $(this)
        , $listMixItem = $dropdown.closest("." + settings.classes.listMixItem)
        , $listMixHeaderLegend = $listMixItem.find("." +
          settings.classes.listMixHeaderLegend)
        , $listMixBody = $listMixItem.find("." + settings.classes.listMixBody)
        , $listMixInfoClass = $listMixItem.find("." +
          settings.classes.listMixInfo)

      if ($listMixItem.hasClass(settings.classes.openState)) {
        $listMixHeaderLegend.css("visibility", "visible")
      } else {
        $listMixHeaderLegend.css("visibility", "hidden")
      }

      $listMixInfoClass.toggle()
      $listMixItem.toggleClass(settings.classes.openState)
      $listMixBody.toggle(150, "swing")

      return $dropdown
    },

    init: function(options) {

    }
  }

  $.fn.reduList = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments,
        1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.reduList")
    }
  }

  $.fn.reduList.defaults = {
    classes: {
      listMixItem: "list-mix-item"
    , listMixHeaderLegend: "list-mix-header .legend"
    , listMixBody: "list-mix-body"
    , listMixInfo: "list-mix-info"
    , openState: "open"
    }
  }

  $(function() {
    $(document).on("click", ".list-mix .button-dropdown:not(.button-disabled)",
      function(e) {
      $(this).reduList("toggleDropdown")
    })
  })

}) (window.jQuery)