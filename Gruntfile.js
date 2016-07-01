var expressReloadWatchFiles = [
  'app.js',
  'routes/**/*.js'
];

module.exports = function(grunt) {
  grunt.initConfig({

    express: {
      dev: {
        options: {
          script: 'app.js',
          debug: true,
          background: true
        }
      }
    },

    jshint: {
      options: {},
      grunt: [
        'Gruntfile.js'
      ],
      client: [
        'public/javascripts/**/*.js',
        '!public/javascripts/build*.js',
        '!public/javascripts/lib/**/*.js'
      ],
      server: expressReloadWatchFiles
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/css/main.css': 'view/styles/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['views/templates/js/jquery-2.1.3.min.js', 'views/templates/js/plugins.js', 'views/templates/js/v2.js'],
        dest: 'views/templates/js/concat.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'views/templates/js/v2.min.js': ['views/templates/js/concat.js']
        }
      }
    },

    //Live-reloading
    watch: {
      css: {
        files: ['view/styles/**/*.less'],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['views/**/*.jade'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['views/templates/js/**/*.js'],
        tasks: ['jshint:client'],
        options: {
          livereload: true,
          interrupt: false
        }
      },
      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt'],
        options: {
          reload: true
        }
      },
      express: {
        files: expressReloadWatchFiles,
        tasks: ['jshint:server', 'express:dev'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['sass', 'concat', 'uglify']);
  grunt.registerTask('up', ['express:dev', 'watch']);
};
