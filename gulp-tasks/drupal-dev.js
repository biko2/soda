var path = require('path');

var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function (gulp, plugins, options) {
    'use strict';
    gulp.task('drupal:watch'
    , function () {
        return gulp.watch(['./templates/**/**'],gulp.series(
            'build:dev',
            'browser-sync:reload'
        ));

    });
    gulp.task('watch:dev', gulp.parallel(
      'drupal:watch',
      'watch'));
     gulp.task('dev',
      gulp.series('build:dev',
          'browser-sync',
          'watch:dev'
      ));
  
   
  };
  