/**
 * @file
 * Task: Clean:JS.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  // Clean js files.
  gulp.task('clean:twigPages', function () {
    plugins.del.sync([
      options.twigPages.destination
    ]);
    return Promise.resolve();
  });
};
