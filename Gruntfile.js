module.exports = function(grunt) {
  pkg: grunt.file.readJSON('package.json'),
  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'index.js',
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['sass', 'concat', 'uglify']);
};
