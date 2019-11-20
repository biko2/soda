/**
 * @file
 * Task: jekyll.
 */

/* global module */

module.exports = function (gulp, plugins, options) {
  'use strict';

  var shell = require('shelljs');


  // Clean CSS files.
  gulp.task('jekyll', function (cb) {
    const resultCode = shell.exec('jekyll build').code;

    if (resultCode !== 0) {
      plugins.notify("ERROR JEKYLL")
    } else {
        plugins.notify("Compilación JEKYLL terminada");
    }
    cb();
  });
};
