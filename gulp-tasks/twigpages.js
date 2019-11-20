/**
 * @file
 * Task: Generate TWIG based pages.
 */

module.exports = function (gulp, plugins, options) {
    'use strict';

    var twigHelpers = require('./twig/twigHelpers')(options)

   
   require('./twigpages.components.js')(gulp, plugins, options,twigHelpers);
   require('./twigpages.component.list.js')(gulp, plugins, options,twigHelpers);
   require('./twigpages.component.blocks.js')(gulp, plugins, options,twigHelpers);
   require('./twigpages.pages.js')(gulp, plugins, options,twigHelpers);

   require('./twigpages.devguide.js')(gulp, plugins, options,twigHelpers);
    
   
    gulp.task('watch:twigPages', function () {
        return gulp.watch(options.twigPages.allSrc,gulp.series('twigPages','browser-sync:reload'));
      });
      gulp.task('twigPages', gulp.parallel('twigPages:dev-guide','twigPages:components-list','twigPages:components','twigPages:component-blocks','twigPages:pages'));
  };

