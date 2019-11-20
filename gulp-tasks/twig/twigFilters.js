var twigFilters = []
var twigDrupal = require('twig-drupal-filters');
twigDrupal({
  extendFunction: function(name,func){
  },
  extendFilter: function(name,func){
    twigFilters.push({
      name:name,
      func:func
    })
  }
});
twigFilters.push({
  name:'raw',
  func: function(value){
    return value;
  }
});
module.exports = twigFilters;
