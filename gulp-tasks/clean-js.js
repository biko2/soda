/**
 * @file
 * Task: Clean:JS.
 */

 /* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  // Clean js files.
  gulp.task('clean:js', function () {
    plugins.del.sync([
      options.js.destination
    ]);
    return Promise.resolve();

  });
};
