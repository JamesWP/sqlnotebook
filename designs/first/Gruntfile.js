module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: 'content/style.css.map', // where file is generated and located
          sourceMapURL: '/content/style.css.map', // the complete url and filename put in the compiled css file
          sourceMapBasepath: '/', // Sets sourcemap base path, defaults to current working directory.
          sourceMapRootpath: '/', // adds this path onto the sourcemap filename and less file paths
        },
        files: {
          "content/style.css": "content/style.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['content/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-serve');
  grunt.registerTask('default', ['less', 'watch']);
};
