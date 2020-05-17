
let funcSvgSprite = function(id,iconClass){
  if(typeof iconClass=='undefined'){
    iconClass='';
  }
  var output = '<svg class="icon ' + iconClass +' svg--'+id+'-dims' + '">';
  output += '<use xlink:href="/svg/sprite/sprite.svg#';
  output += id;
  output += '"></use></svg>';
  return output;
}
let funcActiveMenu = function(target,current){
  if(target === current){
    return 'active';
  }
  return '';
}
let funcResponsiveImage = function(imageName,alt){
  let output = '<img srcset="';
  output += imageName;
  output += '-320w.jpg 320w,';
  output += imageName;
  output += '480w.jpg 480w,';
  output += imageName;
  output += '.jpg 800w"sizes="(max-width: 320px) 280px,(max-width: 480px) 440px,800px" src="';
  output += imageName;
  output += '-800w';
  output += '.jpg" alt="';
  output += alt;
  output += '">';
  return output;
}
var funcDump = function(data, key = "twigDump"){
  console.log(key,data);
  return '<script type="text/javascript">console.log("' + key + '",' + JSON.stringify(data) + ')</script>';
}
var twigFunctions = [
  {
    name: "svgSprite",
    func: funcSvgSprite

  },
  {
    name: "activeMenu",
    func: funcActiveMenu

  },{


    name: "responsiveImage",
    func: funcResponsiveImage
  },{
    name: "dump",
    func: funcDump,
  }

];
var twigDrupal = require('twig-drupal-filters');
twigDrupal({
  extendFunction: function(name,func){
    twigFunctions.push({
      name:name,
      func:func
    })
  },
  extendFilter: function(name,func){}
});

module.exports = twigFunctions;
