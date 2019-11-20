/**
 * @file
 * Task: Compile: JavaScript.
 */

/* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('minify:js', function () {

    return gulp.src([
      options.js.compiledFiles,
      '!' + options.js.destination + '**/*.min.js'
    ])
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      .pipe(plugins.uglify({ output: { comments: 'some' } }))
      .pipe(gulp.dest(options.js.destination));
  });
};
