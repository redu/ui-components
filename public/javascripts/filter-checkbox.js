(function( $ ) {

  var FilterCheckBox = function(statesCount, state) {
    this.statesCount = typeof statesCount !== 'undefined' ? statesCount : 2
    this.state = typeof state !== 'undefined' ? state : this.NOT_CHECKED
  }

  FilterCheckBox.prototype = {

    constructor: FilterCheckBox

  , toggle: function() {
      if (this.statesCount === 2) {
        if (this.state == this.CHECKED) {
          this.state = this.NOT_CHECKED
        } else if (this.state == this.NOT_CHECKED) {
          this.state = this.CHECKED
        }
      } else if (this.statesCount == 3) {
        if (this.state == this.CHECKED) {
          this.state = this.NOT_CHECKED
        } else if (this.state == this.NOT_CHECKED) {
          this.state = this.PARTIALLY_CHECKED
        } else if (this.state == this.PARTIALLY_CHECKED) {
          this.state = this.CHECKED
        }
      }
    }

  }

  FilterCheckBox.prototype.NOT_CHECKED = 0
  FilterCheckBox.prototype.PARTIALLY_CHECKED = -1
  FilterCheckBox.prototype.CHECKED = 1


  var methods = {
     init : function( options ) {
       return this.each(function() {
        var $this = $(this)
        $this.find('.filter').addClass('filter-active')
        $this.find('label').each(function() {
          var $this = $(this)

          if ($this.siblings().length !== 0) {
            // Se é um pai, tem 3 estados.
            $this.data('checkbox', new FilterCheckBox(3))
          } else {
            // Se é uma folha, tem somente 2 estados.
            $this.data('checkbox', new FilterCheckBox())
          }

          var findSiblings = function( e ) {
            var $parent = e.parent()
            var $grandParent = $parent.parent()
            var $siblings = []

            $grandParent.children('li').each(function() {
              if (!$(this).is($parent)) {
                $siblings.push($(this).children('label'))
              }
            })

            return $siblings
          }

          var checkParent = function ( e ) {
            var $parent = e.parent().parent().parent().children('label:first')
            $parent.data('checkbox').state = 1
            $parent.addClass('checkbox-checked')
          }

          $this.click(function() {
            var checkbox = $this.data('checkbox')
            checkbox.toggle()
            if (checkbox.state === -1) {
              $this.attr('state', '-1')
            } else if (checkbox.state == 1) {
              $this.addClass('checkbox-checked')
              $this.attr('state', '1')
            } else {
              $this.removeClass('checkbox-checked')
              $this.attr('state', '0')
            }

            // var $siblings = findSiblings($this)
            // var $allSiblingsChecked = true
            // $.each($siblings, function() {
            //   if ($(this).data('checkbox').state == 0) {
            //     $allSiblingsChecked = false
            //   }
            // })

            // if ($allSiblingsChecked) {
            //   checkParent($this)
            // }
          })
        })
       });
     }
  };

  $.fn.filterCheckBox = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments )
    } else {
      $.error( 'Method ' +  method + ' does not exist.' )
    }

  };

  $(function () {
    $('.filter-toolbar').filterCheckBox()
  })

})( jQuery );