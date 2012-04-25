!(function($) {

  "use strict"

  var methods = {
    // Verifica se todos os checkboxes "Todos" estão marcados.
    checkFilterAll: function(event, filterToolBar, filterEverything) {
      var allChecked = true

      // Para todos os checkboxes "Todos".
      filterToolBar.find('.filter-all > input[type="checkbox"]').each(function() {
          allChecked = allChecked && $(this).prop("checked")
          // Retorna falso caso algum esteja desmarcado.
          return allChecked
      })

      // Se todos estão marcados, ative o filtro "Tudo".
      if (allChecked) {
        filterEverything.addClass("filter-active")
      }
    },

    // Responsável pela parte de hierarquia de checkboxes.
    // Fonte: http://css-tricks.com/indeterminate-checkboxes/
    changeCheckBox: function(event) {
      var checked = $(this).prop("checked"),
          container = $(this).parent(),
          siblings = container.siblings();

      container.find('input[type="checkbox"]').prop({
          indeterminate: false,
          checked: checked
      });

      function checkSiblings(el) {
        var parent = el.parent().parent(),
            all = true;

        el.siblings().each(function() {
            return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
        });

        if (all && checked) {
            parent.children('input[type="checkbox"]').each(function() {
              $(this).prop({
                indeterminate: false,
                checked: checked
              });

              if ($(this).parent().hasClass("filter-all")) {
                $(this).trigger("checkFilterAll", [event.data.filterToolBar, event.data.filterEverything])
              }
            })

            checkSiblings(parent);
        } else if (all && !checked) {
            parent.children('input[type="checkbox"]').prop("checked", checked)
            parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
            checkSiblings(parent);
        } else {
            el.parents("li").children('input[type="checkbox"]').prop({
                indeterminate: true,
                checked: false
            })
        }
      }

      checkSiblings(container);

      container.parents(".filter-level-1").find('input[type="checkbox"]').each(function() {
        var checkbox = $(this)
        if (checkbox.prop("checked") || checkbox.prop("indeterminate")) {
          checkbox.parent().addClass("filter-checked")
        } else {
          checkbox.parent().removeClass("filter-checked")
        }
      })

      // Substitui o sub título do filtro.
      $(this).trigger("replaceSubTitle", [$(this).parents(".filter-group"), event.data.filterEverything])

      if (container.hasClass("filter-all")) {
        // Caso "Todos", verifica se todos os outros estão marcados também.
        $(this).trigger("checkFilterAll", [event.data.filterToolBar, event.data.filterEverything])
      }
    },

    // Responsável por alternar o estado do filtro "Tudo".
    filterEverything: function(event, filterGroup) {
      var filter = filterGroup.find(".filter").first()

      if (filter.hasClass("filter-active")) {
        // Clica no checkbox "Todos" que estão desmarcados, para ativar o filtro.
        filterGroup.siblings().each(function() {
          $(this).find('.filter-all > input[type="checkbox"]').first().filter(function(index) {
            return !this.checked
          }).click().change()
        })
      } else {
        // Clica no checkbox "Todos" que estão marcados, para desativar o filtro.
        filterGroup.siblings().each(function() {
          var filterAllCheckBox = $(this).find('.filter-all > input[type="checkbox"]').first()
          if (filterAllCheckBox.prop("checked")) {
            filterAllCheckBox.click().change()
          }
          if (filterAllCheckBox.prop("indeterminate")) {
            filterAllCheckBox.click().click().change()
          }
        })
      }
    },

    // Substitui o sub título de um filtro de acordo com os checkboxes marcados.
    replaceSubTitle: function(event, filterGroup, filterEverything) {
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

      if (checkedBoxes.length >= 1) {
        filter.addClass("filter-active")
      } else {
        filter.removeClass("filter-active")
        filterEverything.removeClass("filter-active")
      }

      if (subTitleText.length > 28) {
        subTitleText = subTitleText.substring(0, 24) + "..."
      }

      filterGroup.find(".filter-sub-title").text(subTitleText)
    },

    init: function(options) {
      return this.each(function() {
        var filterToolBar = $(this)
        var filterEverything = filterToolBar.find(".filter-everything").first()

        // Adiciona os eventos dos checkboxes.
        filterToolBar.find('input[type="checkbox"]').each(function() {
          var checkbox = $(this)

          // Para os checkboxes "Todos".
          if (checkbox.parent().hasClass("filter-all")) {
            checkbox.bind("checkFilterAll.filterToolBar", methods.checkFilterAll)

            if (checkbox.prop("checked")) {
              checkbox.click()
            }
          }

          checkbox.bind("replaceSubTitle.filterToolBar", methods.replaceSubTitle)
          checkbox.bind("change", {
              "filterToolBar": filterToolBar,
              "filterEverything": filterEverything
            }, methods.changeCheckBox)
          checkbox.click(function(e) {
            e.stopPropagation()
          })
        })


        filterEverything.bind("filterEverything.filterToolBar", methods.filterEverything)
        filterEverything.click(function(e) {
            e.preventDefault()
            filterEverything.trigger("filterEverything", [filterEverything.parents(".filter-group")])
          })
        if (!filterEverything.hasClass("filter-active")) {
          filterEverything.click()
        }
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