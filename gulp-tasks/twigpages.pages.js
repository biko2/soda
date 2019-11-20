/**
 * @file
 * Task: Generate TWIG based pages.
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');
module.exports = function (gulp, plugins, options,twigHelpers) {
    'use strict';
    gulp.task('twigPages:pages', function () {
      var allComponentData = {};
      let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
      componentListFiles.forEach(function(file){
        var componentData = twigHelpers.getComponentJSON(file);
        allComponentData = Object.assign(allComponentData, componentData);
        
      });
        return gulp.src([options.twigPages.pagesSrc])
        //Stay live and reload on error.
        .pipe(plugins.plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        //Setting default data.
        .pipe(plugins.data(function(file){
            return {
                title:'Default Title',
                pageTitle: "Default Page Title",
            }
        }))
        //Getting json data.
        .pipe(plugins.data(function(file){

            return allComponentData;
        }))
        .pipe(plugins.data(function(file){
              var filePath = file.path;
              var componentData = twigHelpers.getComponentJSON(filePath);
              file.data=componentData;
            }))
        //Render via Twig plugin
        .pipe(plugins.gap.prependText('{% extends "@base/twigs/page.twig" %}'))
        .pipe(plugins.twig(twigHelpers.twigConfigs))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        //Save files.
        .pipe(gulp.dest(options.twigPages.pagesDestination));
    });
  };
