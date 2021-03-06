module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/index.css': 'scss/index.scss',
          'css/resume.css': 'scss/resume.scss',
          'css/webicons.css': 'scss/webicons.scss'
        }        
      }
    },

    watch: {

      grunt: {
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    },

    connect: {
      dev: {
        port: 5555,
        base: '.'
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('server', ['connect:dev']);
}