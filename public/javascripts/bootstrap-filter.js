!(function($) {

  "use strict"

  var methods = {

    // Verifica os irmãos do checkbox.
    checkSiblings: function(checked, el) {
      var parent = el.parent().parent(),
          all = true

      el.siblings().each(function() {
        return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked)
      })

      if (all && checked) {
        parent.children('input[type="checkbox"]').prop({
          indeterminate: false,
          checked: checked
        })
        methods.checkSiblings(checked, parent)

      } else if (all && !checked) {
        parent.children('input[type="checkbox"]').prop("checked", checked)
        parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0))
        methods.checkSiblings(checked, parent)

      } else {
        el.parents("li").children('input[type="checkbox"]').prop({
          indeterminate: true,
          checked: false
        })
      }
    },

    // Responsável pela parte de hierarquia de checkboxes.
    // Fonte: http://css-tricks.com/indeterminate-checkboxes/
    changeCheckBox: function(event) {
      var checked = $(this).prop("checked"),
          container = $(this).parent()

      container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      })

      methods.checkSiblings(checked, container)

      // Adiciona a classe que escurece o texto dos itens marcados.
      event.data.filterGroup.find('input[type="checkbox"]').each(function() {
        var checkbox = $(this)
        if (checkbox.prop("checked") || checkbox.prop("indeterminate")) {
          checkbox.parent().addClass("filter-checked")
        } else {
          checkbox.parent().removeClass("filter-checked")
        }
      })

      // Substitui o sub título do filtro.
      $(this).trigger("replaceSubTitle", [event.data.filterGroup])
    },

    // Desmarca totalmente um filtro.
    uncheckFilter: function(filterGroup) {
      filterGroup.find(".filter").removeClass("filter-active")
      filterGroup.find(".filter-sub-title").text("")
      filterGroup.find("li").removeClass("filter-checked")
      filterGroup.find('input[type="checkbox"]').prop({
        checked: false,
        indeterminate: false
      })
    },

    // Substitui o sub título de um filtro de acordo com os checkboxes marcados.
    replaceSubTitle: function(event, filterGroup) {
      var checkedBoxes = filterGroup.find('input[type="checkbox"]:checked')
      var filter = filterGroup.find(".filter").first()
      var subTitleText = ""

      if (checkedBoxes.length === 1) {
        subTitleText = checkedBoxes.siblings("label").text()
      } else if (checkedBoxes.length > 1) {
        // Subtrai um pois não conta a opção "Todos".
        subTitleText = (checkedBoxes.length - 1) + " opções selecionadas"
      }

      // Caso especial para o filtro de cursos e disciplinas.
      if (filter.hasClass("filter-courses")) {
        var coursesCheckBoxes = filterGroup.find('.filter-level-2 > li > input[type="checkbox"]')

        // Cursos.
        var coursesCheckedBoxes = coursesCheckBoxes.filter(':checked')
        if (coursesCheckedBoxes.length === 1) {
          subTitleText = coursesCheckedBoxes.siblings("label").text()
        } else if (coursesCheckedBoxes.length > 1) {
          subTitleText = coursesCheckedBoxes.length + " cursos selecionados"
        }

        // Disciplinas.
        var coursesUnCheckedBoxes = coursesCheckBoxes.filter(function(index) {
          return $(this).prop("indeterminate")
        })
        if (coursesUnCheckedBoxes.length >= 1) {
          var disciplinesCheckedBoxes = filterGroup.find('.filter-level-3 > li > input[type="checkbox"]:checked')

          if (disciplinesCheckedBoxes.length === 1) {
            subTitleText = disciplinesCheckedBoxes.siblings("label").text()
          } else if (disciplinesCheckedBoxes.length > 1) {
            subTitleText = disciplinesCheckedBoxes.length + " disciplinas selecionadas"
          }
        }
      }

      // Adiciona a classe de filtro ativado.
      if (checkedBoxes.length >= 1) {
        filter.addClass("filter-active")
        // Desmarca os outros filtros.
        filterGroup.siblings().each(function() {
          methods.uncheckFilter($(this))
        })
      } else {
        filter.removeClass("filter-active")
      }

      // Trata os nomes grandes.
      if (subTitleText.length > 28) {
        subTitleText = subTitleText.substring(0, 24) + "..."
      }

      filterGroup.find(".filter-sub-title").text(subTitleText)
    },

    init: function(options) {
      return this.each(function() {
        var filterToolBar = $(this)
        var filterEverything = filterToolBar.find(".filter-everything").first()
        // O filtro "Tudo" começa ativo.
        filterEverything.addClass("filter-active")
        // No estado ativado, desabilita todos os outros filtros.
        filterEverything.click(function(e) {
          filterEverything.parent().siblings().each(function() {
            methods.uncheckFilter($(this))
          })
        })

        // Para cada filtro.
        filterToolBar.children().each(function() {
          var filterGroup = $(this)
          // Para cada checkbox.
          filterGroup.find('input[type="checkbox"]').each(function() {
            var checkbox = $(this)
            // Inicia desmarcado.
            checkbox.prop("checked", false)
            // Vincula o evento de substituir o sub título do filtro.
            checkbox.bind("replaceSubTitle.filterToolBar", methods.replaceSubTitle)
            checkbox.bind("change", {"filterGroup": filterGroup}, methods.changeCheckBox)
          })
        })

        // Impede que o dropdown feche ao ser clicado.
        filterToolBar.find(".dropdown-menu").click(function(e) {
          e.stopPropagation()
        })
      })
    },

    // Alterna o estado de ativado dos filtros.
    toggleState: function() {
      return this.each(function() {
        var filter = $(this)

        filter.click(function(e) {
          e.preventDefault()

          if (!filter.hasClass("filter-active")) {
            filter.addClass("filter-active")
          } else {
            filter.removeClass("filter-active")
          }
        })
      })
    }
  }

  $.fn.filterToolBar = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error("O método " + method + " não existe em jQuery.filterToolBar")
    }
  }

}) (window.jQuery)

$(function() {
  // Alterna o estado de ativado nos filtros sem menu dropdown.
  $(".filter:not(.dropdown-toggle)").filterToolBar('toggleState')
  // Adiciona os eventos dos filtros da visão geral.
  $(".filter-toolbar").filterToolBar()
})