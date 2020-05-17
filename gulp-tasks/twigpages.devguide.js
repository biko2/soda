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
     if(options.production){
       return cb();
     }
     let pageList = [];
     //Iterate over source files.
     let pageListFiles =  glob.sync(options.twigPages.pagesSrc);
     pageListFiles.forEach(function(file){
       pageList.push(path.basename(path.dirname(file)));

     });
     let componentList = [];
     let componentListBaseString = 'src/templates/01-components/';
     let componentBlocksList = [];
     let componentBlocksListBaseString = 'src/templates/02-component-blocks/';


     let componentListFiles =  glob.sync(options.twigPages.componentsSrc);
     componentListFiles.forEach(function(file){
       let basename = path.basename(file,'.twig');
       let dirname = path.dirname(file).replace(componentListBaseString, '');
       componentList.push({
        basename: basename,
        dirname:dirname,
        filename:dirname.replace(basename,"")  + basename

        });

     });
     let componentBlocksListFiles =  glob.sync(options.twigPages.componentBlocksSrc);
     componentBlocksListFiles.forEach(function(file){
      let basename = path.basename(file,'.twig');
      let dirname = path.dirname(file).replace(componentBlocksListBaseString, '');
      componentBlocksList.push({
        basename: basename,
        dirname:dirname,
        filename:dirname.replace(basename,"")  + basename
      });
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
       .pipe(plugins.rename(function (path) {
         path.dirname = '';
         path.basename = 'index';
       }))
       .pipe(gulp.dest(options.twigPages.destination));


   });

  };
