/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Download Libs Tasks
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    clean: {
      dist: ['dist/app', 'dist/index.html'],
      build: ['build'],
    },

    // dojo build configuration, mainly taken from dojo boilerplate
    dojo: {
      dist: {
        options: {
          profile: 'profiles/app.profile.js', // Profile for build
        },
      },
      options: {
        dojo: 'dist/dojo/dojo.js', // Path to dojo.js file in dojo source
        load: 'build', // Optional: Utility to bootstrap (Default: 'build')
        // profiles: [], // Optional: Array of Profiles for build
        // appConfigFile: '', // Optional: Config file for dojox/app
        // package: '', // Optional: Location to search package.json (Default: nothing)
        // packages: [], // Optional: Array of locations of package.json (Default: nothing)
        // require: '', // Optional: Module to require for the build (Default: nothing)
        // requires: [], // Optional: Array of modules to require for the build (Default: nothing)
        releaseDir: '../build', // Optional: release dir rel to basePath (Default: 'release')
        cwd: './', // Directory to execute build within
        // dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
        // Optional: Base Path to pass at the command line
        // Takes precedence over other basePaths
        // Default: null
        basePath: './dist',
      },
    },

    // the perl regexp section of build.sh in the dojo boilerplate
    'string-replace': {
      index: {
        src: './src/web/index.html',
        dest: './build/index.html',
        options: {
          replacements: [
            // remove isDeubug
            {
              pattern: /isDebug: *true,/,
              replacement: '',
            },
          ],
        },
      },
    },

    shell: {
      bowerInstall: {
        command: 'bower install',
      },
    },

    babel: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src/web/app',
          src: [
            '*.js', '**/*.js', '**/**/*.js',
            '!dmodel/*',
            '!app.profile.js',
            '!app/**/**/nls/*.js',
            '!dojoConfig.js', '!**/*Spec.js', '!**/**/*Spec.js',
          ],
          dest: 'dist/app',
        },],
      },
    },
    copy: {
      dev: {
        cwd: 'src/web/', // set working folder / root to copy
        src: [
          'index.html', 'app/css/*.css',
        ],
        dest: 'dist/', // destination folder
        expand: true // required when using cwd
      },
    },
  });

  grunt.registerTask('init', ['shell:bowerInstall']);
  grunt.registerTask('build', ['default', 'clean:build', 'dojo', 'string-replace']);
  grunt.registerTask('default', ['clean:dist', 'babel:dev', 'copy:dev']);
};
