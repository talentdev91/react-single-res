'use strict';

module.exports = function(grunt) {
  
  // Server Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  //Client/Build Tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.laodNpmTasks('grunt-karma');

  grunt.initConfig({

  	jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      dev: {
        src: ['Gruntfile.js', 'test/drones_api_test.js', 'server.js', 'models/**/*.js', 'routes/**/*.js', 'app/**/*.js']
      }
    },

    jscs: {
      src: ['test/drones_api_test.js', 'test/karma_tests/drones_controller_test.js', 'server.js', 'models/**/*.js', 'routes/**/*.js', 'app/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      all: {
        src: ['test/drones_api_test.js']
      }
    },

    clean: {
    	build: {
    		src: ['build/']
    	}
    },

    copy: {
    	build: {
    		expand: true,
    		cwd: 'app/',
    		src: '**/*.html',
    		dest: 'build/',
    		flatten: false,
    		filter: 'isFile'
    	}
    },
    browserify: {
    	dev: {
    		src: ['app/js/**/*.js'],
    		dest: 'build/bundle.js'
    	},

	    test: {
	    	src: ['test/client_side/*_test.js'],
	    	dest: 'test/client_side/test_bundle.js'
	    },
	    karmatest: {
	    	src: ['test/karma_tests/*_test.js'],
	    	dest: 'test/karma_tests/karma_test_bundle.js'
	    },
	    options: {
	    	transfom: ['reactify', 'debowerify']
	    }
	},

	karma: {
		unit: {
			configFile: 'karma.conf.js'
		}
	}
  });
  grunt.registerTask('test', ['jshint', 'jscs', 'mocha']);
  grunt.registerTask('default', ['test']);

  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
};
