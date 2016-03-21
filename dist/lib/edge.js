'use strict';

module.exports = function Edge(weight, source, target) {
  var data = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  this.weight = weight;
  this.source = source;
  this.target = target;
  this._ = data;
};