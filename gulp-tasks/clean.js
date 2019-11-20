/**
 * @file
 * Task: Clean.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('clean', gulp.parallel('clean:js', 'clean:css', 'clean:styleguide','clean:twigPages'));
};
