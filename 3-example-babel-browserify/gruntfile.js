/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    'browserify': {
      dist: {
        files: {
          'dist/bundle.js': ['src/index.js']
        },
        options: {
          watch: true,
          transform: ['babelify'],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    'watch': {
      scripts: {
        files: ['nonsense'],
        tasks: [],
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['browserify', 'watch']);
};