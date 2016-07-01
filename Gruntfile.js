var expressReloadWatchFiles = [
  'app.js',
  'routes/*.js'
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

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'public/css/main.css': 'styles/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['views/templates/js/html5shiv.js', 'views/templates/js/jquery-2.1.3.min.js', 'views/templates/js/plugins.js', 'views/templates/js/main.js'],
        dest: 'views/templates/js/concat.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'views/templates/js/main.min.js': ['views/templates/js/concat.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dist'],
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
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask('up', ['express:dev', 'watch']);
};
