/**
 * @file
 * Task: Generate TWIG based pages.
 */
var path = require('path');
var glob = require('glob');

module.exports = function (gulp, plugins, options,twigHelpers) {
    'use strict';
   gulp.task('twigPages:components-list', function () {
    let componentList = [];
    var allComponentData = {};

    let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
    componentListFiles.forEach(function(file){
        var componentData = twigHelpers.getComponentJSON(file);
        allComponentData = Object.assign(allComponentData, componentData);
        //componentList.push(path.basename(file,'.twig'));
        //componentList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file)});
        componentList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file).replace('src/templates/01-components/', '')});

    });
    return gulp.src([path.join(options.twigPages.baseSrc,'components-list-template.twig')])
    .pipe(plugins.data(function(file){
      var componentsString= "";
      componentList.forEach(function(element){
        var componentInclude= "<h2>"+element.filename+"</h2>"+"{% include '@components/"+ element.dirname + "/" + element.filename + ".twig' %}";
        componentsString += componentInclude;

      });
      var content= file.contents.toString().replace('COMPONENTS_LIST', componentsString);
      file.contents = new Buffer.from(content);

      return allComponentData;
    }))
    .pipe(plugins.twig(twigHelpers.twigConfigs))
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    //Save files.
      .pipe(gulp.dest(options.twigPages.destination));

  });
  };
