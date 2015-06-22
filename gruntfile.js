module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'dist/iswear.js': ['src/iswear.js']
        }
      }
    },
    shell: {
      test: {
        command: "for f in test/*; do echo \"$f\"; mocha \"$f\"; done; exit 0"
      },
      bundle: {
        command: "browserify dist/iswear.js > dist/iswear.min.js -s iswear; rm dist/iswear.js"
      }
    }
  });
  // load task plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  // register main tasks
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('build', ['minify', 'shell:bundle']);
  grunt.registerTask('test', ['build', 'shell:test']);
};
