var customPaths = {};
var customOptions = {};

var gulp = require('gulp');
var fs = require('fs');

if (fs.existsSync('./gulpfile.custom.paths.js')) {
  customPaths = require('./gulpfile.custom.paths.js');
}
if (fs.existsSync('./gulpfile.custom.options.js')) {
  customOptions = require('./gulpfile.custom.options.js');
}

require('gulp-tasks-soda')(gulp,customPaths,customOptions);