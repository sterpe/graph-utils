'use strict';

module.exports = function Vertex(id) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  this._ = data;
  this.id = id;
  this.edges = {
    incoming: [],
    outgoing: []
  };
};