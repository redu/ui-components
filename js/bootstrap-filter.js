!(function($) {

  "use strict";

  var methods = {

    // Verifica os irmãos do checkbox.
    checkSiblings: function(checked, el) {
      var parent = el.parent().parent()
        , all = true

      el.siblings().each(function() {
        return all = ($(this).children('input[type="checkbox"]').prop('checked') === checked)
      })

      if (all && checked) {
        parent.children('input[type="checkbox"]').prop({
          indeterminate: false,
          checked: checked
        })
        methods.checkSiblings(checked, parent)

      } else if (all && !checked) {
        parent.children('input[type="checkbox"]').prop('checked', checked)
        parent.children('input[type="checkbox"]').prop('indeterminate', (parent.find('input[type="checkbox"]:checked').length > 0))
        methods.checkSiblings(checked, parent)

      } else {
        el.parents('li').children('input[type="checkbox"]').prop({
          indeterminate: true,
          checked: false
        })
      }
    },

    // Responsável pela parte de hierarquia de checkboxes.
    // Fonte: http://css-tricks.com/indeterminate-checkboxes/
    changeCheckBox: function(event) {
      var checked = $(this).prop('checked')
        , container = $(this).parent()

      container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      })

      methods.checkSiblings(checked, container)

      // Adiciona a classe que escurece o texto dos itens marcados.
      event.data.filterGroup.find('input[type="checkbox"]').each(function() {
        var checkbox = $(this)

        if (checkbox.prop('checked') || checkbox.prop('indeterminate')) {
          checkbox.parent().addClass(event.data.settings.filterCheckedClass)
        } else {
          checkbox.parent().removeClass(event.data.settings.filterCheckedClass)
        }
      })

      // Substitui o sub título do filtro.
      $(this).trigger('replaceSubTitle', [event.data.filterGroup])
    },

    // Desmarca totalmente um filtro.
    uncheckFilter: function(filterGroup, settings) {
      filterGroup.find('.' + settings.filterClass).removeClass(settings.filterActiveClass)
      filterGroup.find('.' + settings.filterSubTitleClass).text('')
      filterGroup.find('li').removeClass(settings.filterCheckedClass)
      filterGroup.find('input[type="checkbox"]').prop({
        checked: false,
        indeterminate: false
      })
    },

    // Substitui o sub título de um filtro de acordo com os checkboxes marcados.
    replaceSubTitle: function(event, filterGroup) {
      var checkedBoxes = filterGroup.find('input[type="checkbox"]:checked')
        , filter = filterGroup.find('.' + event.data.settings.filterClass)
        , subTitleText = ''

      if (checkedBoxes.length === 1) {
        subTitleText = checkedBoxes.siblings('label').text()
      } else if (checkedBoxes.length > 1) {
        // Subtrai um pois não conta a opção "Todos".
        subTitleText = (checkedBoxes.length - 1) + ' opções selecionadas'
      }

      // Caso especial para o filtro de cursos e disciplinas.
      if (filter.hasClass(event.data.settings.filterCoursesClass)) {
        var coursesCheckBoxes = filterGroup.find('.' + event.data.settings.filterLevel2ItemClass + ' > input[type="checkbox"]')
          , coursesCheckedBoxes = coursesCheckBoxes.filter(':checked')
          , coursesUnCheckedBoxes = coursesCheckBoxes.filter(function(index) {
            return $(this).prop('indeterminate')
          })

        // Cursos.
        if (coursesCheckedBoxes.length === 1) {
          subTitleText = coursesCheckedBoxes.siblings('label').text()
        } else if (coursesCheckedBoxes.length > 1) {
          subTitleText = coursesCheckedBoxes.length + ' cursos selecionados'
        }

        // Disciplinas.
        if (coursesUnCheckedBoxes.length >= 1) {
          var disciplinesCheckedBoxes = filterGroup.find('.' + event.data.settings.filterLevel3ItemClass + ' > input[type="checkbox"]:checked')

          if (disciplinesCheckedBoxes.length === 1) {
            subTitleText = disciplinesCheckedBoxes.siblings('label').text()
          } else if (disciplinesCheckedBoxes.length > 1) {
            subTitleText = disciplinesCheckedBoxes.length + ' disciplinas selecionadas'
          }
        }
      }

      // Adiciona a classe de filtro ativado.
      if (checkedBoxes.length >= 1) {
        filter.addClass(event.data.settings.filterActiveClass)
        // Desmarca os outros filtros.
        filterGroup.siblings().each(function() {
          methods.uncheckFilter($(this), event.data.settings)
        })
      } else {
        filter.removeClass(event.data.settings.filterActiveClass)
      }

      // Trata os nomes grandes.
      if (subTitleText.length > 28) {
        subTitleText = subTitleText.substring(0, 24) + '...'
      }

      filterGroup.find('.' + event.data.settings.filterSubTitleClass).text(subTitleText)
    },

    init: function(options) {
      var settings = $.extend({
          filterEverythingClass: 'filter-everything',
          filterActiveClass: 'filter-active',
          filterDropdownMenuClass: 'dropdown-menu',
          filterClass: 'filter',
          filterCoursesClass: 'filter-courses',
          filterLevel2ItemClass: 'filter-level-2-item',
          filterLevel3ItemClass: 'filter-level-3-item',
          filterSubTitleClass: 'filter-sub-title',
          filterCheckedClass: 'filter-checked'
        }, options)

      return this.each(function() {
        var reduFilter = $(this)
          , filterEverything = reduFilter.find('.' + settings.filterEverythingClass)
          , dropdownFilters = filterEverything.parent().siblings()

        // O filtro "Tudo" começa ativo.
        filterEverything.addClass(settings.filterActiveClass)
        // No estado ativado, desabilita todos os outros filtros.
        filterEverything.on('click', function(e) {
          dropdownFilters.each(function() {
            methods.uncheckFilter($(this), settings)
          })
        })

        // Para cada filtro.
        dropdownFilters.each(function() {
          var filterGroup = $(this)
          // Para cada checkbox.
          filterGroup.find('input[type="checkbox"]').each(function() {
            var checkbox = $(this)
            // Inicia desmarcado.
            checkbox.prop('checked', false)
            // Vincula o evento de substituir o sub título do filtro.
            checkbox.on('replaceSubTitle.reduFilter', {settings: settings}, methods.replaceSubTitle)
            checkbox.on('change', {settings: settings, filterGroup: filterGroup}, methods.changeCheckBox)
          })
        })

        // Impede que o dropdown feche ao ser clicado.
        reduFilter.find('.' + settings.filterDropdownMenuClass).on('click', function(e) {
          e.stopPropagation()
        })
      })
    }
  }

  $.fn.reduFilter = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments)
    } else {
      $.error('O método ' + method + ' não existe em jQuery.reduFilter')
    }
  }

}) (window.jQuery)

$(function() {
  // Adiciona os eventos dos filtros da visão geral.
  $('.filters-general-view').reduFilter()
})