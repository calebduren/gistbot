var expressReloadWatchFiles = [
  'app.js',
  'routes/**/*.js'
];
var Promise = require('es6-promise').Promise;
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
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
        '!public/js/*.js'
      ],
      server: expressReloadWatchFiles
    },
    sass: {
      options: {
        sourceMap: true,
        livereload: true
      },
      dist: {
        files: {
          'public/css/main.css': 'views/styles/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: '> 5%, last 2 versions, Firefox > 20'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ],
        livereload: true
      },
      dist: {
        src: 'public/css/*.css'
      }
    },
    concat: {
      options: {
        separator: ';',
        livereload: true
      },
      dist: {
        src: ['views/templates/js/jquery-2.1.3.min.js', 'views/templates/js/plugins.js', 'views/templates/js/page.js'],
        dest: 'views/templates/js/concat.js'
      }
    },
    uglify: {
      options: {
        livereload: true,
      },
      my_target: {
        files: {
          'public/js/v2.1.min.js': ['views/templates/js/concat.js']
        }
      }
    },

    //Live-reloading
    watch: {
      css: {
        files: ['views/styles/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      pug: {
        files: ['views/**/*.pug'],
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
        tasks: ['sass', 'postcss:dist', 'concat', 'uglify'],
        options: {
          reload: true
        }
      },
      express: {
        files: expressReloadWatchFiles,
        tasks: ['express:dev'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['express:dev', 'sass', 'postcss:dist', 'concat', 'uglify', 'watch']);
};
