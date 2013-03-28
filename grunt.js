module.exports = function(grunt) {
  var files = [
    'js/bootstrap-util.js'
  , 'js/bootstrap-transition.js'
  , 'js/bootstrap-system-message.js'
  , 'js/bootstrap-dropdown.js'
  , 'js/bootstrap-modal.js'
  , 'js/bootstrap-tooltip.js'
  , 'js/bootstrap-popover.js'
  , 'js/bootstrap-filter.js'
  , 'js/bootstrap-forms.js'
  , 'js/bootstrap-link.js'
  , 'js/bootstrap-list.js'
  , 'js/bootstrap-button.js'
  , 'js/bootstrap-tables.js'
  , 'js/bootstrap-autocomplete.js'
  , 'js/bootstrap-local-nav.js'
  , 'js/bootstrap-modal-redu.js'
  , 'js/bootstrap-spinners.js'
  , 'js/bootstrap-search-form.js'
  , 'js/bootstrap-wall.js'
  ];

  grunt.initConfig({

    lint: {
      files: files
    },

    jshint: {
      options: {
        validthis: true,
        laxcomma: true,
        laxbreak: true,
        browser: true,
        debug: true,
        boss: true,
        expr: true,
        asi: true
      }
    },

    concat: {
      dist: {
        src: files,
        dest: 'js/bootstrap-redu.js'
      }
    },

    min: {
      dist: {
        src: ['js/bootstrap-redu.js'],
        dest: 'js/bootstrap-redu.min.js'
      }
    },

    watch: {
      files: files,
      tasks: 'lint concat'
    }
  });

  grunt.registerTask('default', 'watch');
};
