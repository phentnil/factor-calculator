module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({
    concat: {
      options: {
        separator: ";\n",
      },
      dist: {
        src: ["./src/result.js", "./src/search.js", "./src/units.js"],
        dest: "./src/built.js",
      },
    },
    uglify: {
      options: { sourceMap: true, sourceMapName: "./dist/index-sourcemap.map" },
      target: {
        files: { "./dist/index.min.js": "./src/built.js" },
      },
    },
    pkg: grunt.file.readJSON("package.json"),
    nodemon: {
      dev: {
        script: "index.js",
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-nodemon");

  // Default task(s).
  grunt.registerTask("default", ["nodemon", "concat", "uglify"]);
};
