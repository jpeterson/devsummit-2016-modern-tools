module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: {
        src: [
          'dist/*',
          '!dist/dgrid/**',
          '!dist/dijit/**',
          '!dist/dojo/**',
          '!dist/dojox/**',
          '!dist/dstore/**',
          '!dist/esri/**',
          '!dist/put-selector/**',
          '!dist/util/**',
          '!dist/xstyle/**'
        ]
      }
    },
    babel: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src/app',
          src: [
            '**.js'
          ],
          dest: 'dist/app'
        }]
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false,
        },
        files: {
          'dist/app/styles/main.css': [
            'src/app/styles/*.styl',
            'src/app/components/**/css/*.styl'
          ]
        }
      }
    },
    copy: {
      dev: {
        cwd: 'src/',
        src: [
          'dojoConfig.js', 'index.html'
        ],
        dest: 'dist/',
        expand: true
      }
    },
  });

  grunt.registerTask('default', ['clean:dist', 'babel:dev', 'stylus:dev', 'copy:dev']);
};
