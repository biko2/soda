/**
 * @file
 * Task: Browsersync.
 */

/* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  var browserSync = plugins.browserSync.create();

  gulp.task('browser-sync', function (cb) {
    browserSync.init(options.browserSync);
    cb();
  });

  gulp.task('browser-sync:reload', function (cb) {
    browserSync.reload();
    cb();
  });
};
