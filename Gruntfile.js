/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    },
    connect: {
      test: {
        port: 8000,
        base: '.'
      }
    },
    jasmine: {
      teamcityreporter: {
        src: 'test/fixtures/teamcityreporter/src/*.js',
        options: {
			display: 'none',
			keepRunner: true,
			specs: 'test/fixtures/teamcityreporter/spec/*Spec.js',
			host: 'http://127.0.0.1:<%= connect.test.port %>/',
			template : require('./'),
			templateOptions :
			{
				output: 'output.txt'
			}
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect', 'jasmine:teamcityreporter']);
  grunt.registerTask('default', ['test']);
};