module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['default'],
        options: {
          spawn: false,
          event: ['all']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['jshint']);
};
