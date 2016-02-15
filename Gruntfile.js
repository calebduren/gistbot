var expressReloadWatchFiles = [
  'app.js',
  'routes/**/*.js'
];

module.exports = function (grunt) {
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
        '!public/views/templates/js/*.js',
      ],
      server: expressReloadWatchFiles
    },

    //Live-reloading
    watch: {
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/css/main.css'],
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask('up', ['express:dev', 'watch']);
};
