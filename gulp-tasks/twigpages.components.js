/**
 * @file
 * Task: Generate TWIG based pages.
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');



module.exports = function (gulp, plugins, options,twigHelpers) {
    'use strict';
    gulp.task('twigPages:components', function () {
      return gulp.src([options.twigPages.componentsSrc])
          .pipe(plugins.plumber({
              handleError: function (err) {
                  console.log(err);
                  this.emit('end');
              }
          }))
          //.pipe(plugins.data(twigHelpers.gulpDataAttributes))
          .pipe(plugins.data(function(file){
            var filePath = file.path;
            var componentData = twigHelpers.getComponentJSON(filePath);
 
            filePath = filePath.replace(process.cwd(),'');
            filePath = filePath.replace('/src/templates/01-components/','');
            let templatePath = path.join(process.cwd(),options.twigPages.componentTemplateSrc);
            if(!fs.existsSync(templatePath)){
              gulp.emit('error', new PluginError(TASK_NAME, 'templateSrc "' + templatePath +'" not found!'));
            }
            var templateData = fs.readFileSync(templatePath).toString();
            file.contents = new Buffer.from(fs.readFileSync(templatePath).toString().replace('FILE_PATH', filePath));
            return componentData;
          }))
          .pipe(plugins.twig(twigHelpers.twigConfigs))
          .on('error', function (err) {
              process.stderr.write(err.message + '\n');
              this.emit('end');
          })
          //Save files.
          .pipe(gulp.dest(options.twigPages.componentsDestination));
    });
  };
