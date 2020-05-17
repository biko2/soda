/**
 * @file
 * Task: Build.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('build',  gulp.series(
      'compile:sass',
      'compile:js',
      'compile:vendorjs',
      'images',
      'fonts',
      'twigPages',
      'svg',
      gulp.series('minify:css',
        'minify:js')
        /*'compile:styleguide',*/
    /*  gulp.series('lint:js',
        'lint:js-gulp',
        'lint:js-with-fail',
        'lint:css-with-fail')*/
    ));

  gulp.task('build:dev', gulp.series(
      'compile:sass',
      'compile:js',
      'compile:vendorjs',
      'twigPages',
      'svg'
      )

  );
};
