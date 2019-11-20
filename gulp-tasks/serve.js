/**
 * @file
 * Task: Serve.
 */

/* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('serve', 
    gulp.parallel('build',
    'browser-sync',
    'twigPages',
    'watch'
  ));
  gulp.task('serveWithJekyll', 
    gulp.parallel('build',
    'browser-sync',
    'jekyll',
    'watch'
  ));
};
