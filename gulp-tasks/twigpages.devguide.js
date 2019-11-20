/**
 * @file
 * Task: Generate TWIG based pages.
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');


 module.exports = function (gulp, plugins, options,twigHelpers) {
    'use strict';
   gulp.task('twigPages:dev-guide', function (cb) {
   /*  if(options.production){
       return cb();
     }*/
     //Define empty variable for page list.
     let pageList = [];
     //Iterate over source files.
     let pageListFiles =  glob.sync(options.twigPages.pagesSrc);
     pageListFiles.forEach(function(file){
       //Adding entry to the list.
       pageList.push(path.basename(path.dirname(file)));

     });
     let componentList = [];
     let componentBlocksList = [];

     let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
     componentListFiles.forEach(function(file){
       //Adding entry to the list.
       //console.log(path.basename(file,'.twig'));
       //componentList.push(path.basename(file,'.twig'));
       componentList.push({filename:path.basename(file,'.twig'), dirname:path.dirname(file).replace('src/templates/01-components/', '')});

     });

     let componentBlocksListFiles =  glob.sync(options.twigPages.componentBlocksSrc);
     componentBlocksListFiles.forEach(function(file){
       //Adding entry to the list.
       //console.log(path.basename(file,'.twig'));
       componentBlocksList.push(path.basename(file,'.twig'));
     });
     var devGuideFile = path.join(options.twigPages.baseSrc,'/dev-guide.twig');
     if(!fs.existsSync(devGuideFile)){
       console.log('DEV_GUIDE not found');
     }
     return gulp.src([devGuideFile],{allowEmpty:true})
      .pipe(plugins.data(function(file){
        return {
          pages:pageList,
          components: componentList,
          componentBlocks: componentBlocksList
        }
      }))
      .pipe(plugins.twig(twigHelpers.twigConfigs))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
     //Save files.
     //.pipe(plugins.rename('index.html'))
       .pipe(plugins.rename(function (path) {
         path.dirname = '';
         path.basename = 'index';
       }))
       .pipe(gulp.dest(options.twigPages.destination));


   });

  };
