var path = require('path');
var fs = require('fs');


var _ = require('lodash');
var DrupalAttribute = require('drupal-attribute');

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
        let jsonData = JSON.parse(tokenOutput);
        let attributes = new DrupalAttribute();
        //context = Object.assign(jsonData,context);
        context = _.merge(jsonData, context);
        if(typeof context.attributes === 'object'){
          for(prop in context.attributes){
            attributes.set(prop,context.attributes[prop]);
          }
        }
        context.attributes = attributes;
        var output = '';
        return {
          chain,
          context,
          output
        };
      });
  }
}
var tagEndDefaultValues = {
  type: "enddefaultvalues",
  regex: /^enddefaultvalues$/,
  next: [ ],
  open: false
}
var tags = [tagDefaultValues,tagEndDefaultValues]
var twigTags = function(tw){
  /*tw.exports.extend(function (Twig) {
    Twig.expression.handler['Twig.expression.type.variable'].parse = function(token, stack, context){
    const state = this;
    // Get the variable from the context
    return Twig.expression.resolveAsync.call(state, context[token.value], context)
        .then(value => {
            if (state.template.options.strictVariables && value === undefined) {
                throw new Twig.Error('Variable "' + token.value + '" does not exist.');
            }
           // console.log(value instanceof DrupalAttribute)
            if(value instanceof DrupalAttribute){
            //  console.log(value);
              if(typeof value.toString === 'function'){
                  value = value.toString();
              }
            
          }
           stack.push(value);
        });
      };
    });*/
  tw.exports.extend(function(Twig) {
    TwigFsLoader(Twig);
  });
  tags.forEach(function(element){

    tw.exports.extendTag(element);

  });
}
module.exports = twigTags;
