/**
 * @file
 * Task: Optimize images.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('images', function () {
    return gulp.src(options.images.files)
      .pipe(plugins.imagemin([
        plugins.imagemin.gifsicle({interlaced: true}),
        plugins.imagemin.jpegtran({progressive: true}),
        plugins.imagemin.optipng({optimizationLevel: 7}),
        plugins.imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false},
          ]
        })
      ]))
      .pipe(gulp.dest(options.images.destination))
        .pipe(plugins.notify({message:"Imagenes procesadas.", onLast: true}))
  });
};