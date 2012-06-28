module.exports = function(grunt) {
  var files = [
    'bootstrap-transition.js'
  , 'bootstrap-system-message.js'
  , 'bootstrap-dropdown.js'
  , 'bootstrap-modal.js'
  , 'bootstrap-tooltip.js'
  , 'bootstrap-popover.js'
  , 'bootstrap-filter.js'
  , 'bootstrap-forms.js'
  , 'bootstrap-link.js'
  , 'bootstrap-list.js'
  , 'bootstrap-button.js'
  , 'bootstrap-reply-message.js'
  ]

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
        dest: 'bootstrap-redu.js'
      }
    },

    min: {
      dist: {
        src: ['bootstrap-redu.js'],
        dest: 'bootstrap-redu.min.js'
      }
    },

    watch: {
      files: files,
      tasks: 'lint concat min'
    }
  });

  grunt.registerTask('default', 'watch');
};