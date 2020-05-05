var path = require('path');
var fs = require('fs');

var TwigFsLoader = require('./twigLoader.fs');

var tagDefaultValues = {
  // unique name for tag type
  type: "defaultValues",
  // regex for matching tag
  regex: /^defaultvalues$/,

  // what type of tags can follow this one.
  next: ["enddefaultvalues"], // match the type of the end tag
  open: true,
  compile:function(token) {

    delete token.match;
    return token;
  },
  parse: function (token, context, chain) {
    const state = this;

    return state.parseAsync(token.output, context)
      .then(tokenOutput => {
        context = Object.assign(JSON.parse(tokenOutput),context);
        var output = '';
        return {
          chain,
          context,
          output
        };
      });
  }
}
var tagEndDefaultValuess = {
  type: "enddefaultvalues",
  regex: /^enddefaultvalues$/,
  next: [ ],
  open: false
}

var tags = [tagDefaultValues,tagEndDefaultValuess]
var twigTags = function(tw){
  tw.exports.extend(function(Twig) {
    TwigFsLoader(Twig);
  });
  tags.forEach(function(element){
    tw.exports.extendTag(element);
  });
}


module.exports = twigTags;
