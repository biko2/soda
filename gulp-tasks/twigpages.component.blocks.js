/**
 * @file
 * Task: Generate TWIG based pages.
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');
module.exports = function (gulp, plugins, options,twigHelpers) {
    'use strict';
    gulp.task('twigPages:component-blocks', function () {
      var allComponentData = {};
      let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
      componentListFiles.forEach(function(file){
         var componentData = twigHelpers.getComponentJSON(file);
          allComponentData = Object.assign(allComponentData, componentData);
      });
 
      return gulp.src([options.twigPages.componentBlocksSrc])
      .pipe(plugins.plumber({
        handleError: function (err) {
          console.log(err);
          this.emit('end');
        }
      }))
      .pipe(plugins.data(function(file){
        var filePath = file.path;
        filePath = filePath.replace(process.cwd(),'');
        filePath = filePath.replace('/src/templates/02-component-blocks/','');
        let templatePath = path.join(process.cwd(),options.twigPages.componentBlockTemplateSrc);
        if(!fs.existsSync(templatePath)){
          gulp.emit('error', new PluginError(TASK_NAME, 'templateSrc "' + templatePath +'" not found!'));
        }
        var templateData = fs.readFileSync(templatePath).toString();
        //console.log(templateData);
        file.contents = new Buffer.from(fs.readFileSync(templatePath).toString().replace('FILE_PATH', filePath));
        file.data = allComponentData;
      }))
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
      //Save files.
        .pipe(gulp.dest(options.twigPages.componentBlocksDestination));
    });
  };
