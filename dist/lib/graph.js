'use strict';

var Vertex = require('./vertex');
var Edge = require('./edge');

module.exports = Graph;

function Graph() {
  this.edges = [];
  this.vertices = {};
}

Graph.prototype.addVertex = function (id) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  this.vertices[id] = new Vertex(id, data);

  return this.vertices[id];
};

Graph.prototype.setEdge = function (weight, sourceId, sourceIndex, targetId) {
  var targetIndex = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
  var data = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

  var edge = new Edge(weight, sourceId, targetId, data);

  var oldEdge = this.vertices[sourceId].edges.outgoing[sourceIndex];

  if (oldEdge) {
    this.removeEdge(oldEdge);
  }
  this.edges.push(edge);
  this.vertices[sourceId].edges.outgoing.splice(sourceIndex, 0, edge);
  this.vertices[targetId].edges.incoming.splice(targetIndex, 0, edge);
};

Graph.prototype.addEdge = function (weight, source, target) {
  var data = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  var edge = new Edge(weight, source, target, data);

  this.edges.push(edge);
  this.vertices[source].edges.outgoing.push(edge);
  this.vertices[target].edges.incoming.push(edge);

  return edge;
};

Graph.prototype.removeEdge = function (edge) {
  var i = 0;
  var key = void 0;
  for (; i < this.edges.length; ++i) {
    if (this.edges[i] === edge) {
      break;
    }
  }
  this.edges.splice(i, 1);
  for (key in this.vertices) {
    if (this.vertices.hasOwnProperty(key)) {
      for (i = 0; i < this.vertices[key].edges.outgoing.length; ++i) {
        if (this.vertices[key].edges.outgoing[i] === edge) {
          break;
        }
      }
      this.vertices[key].edges.outgoing.splice(i, 1);
      for (i = 0; i < this.vertices[key].edges.incoming.length; ++i) {
        if (this.vertices[key].edges.incoming[i] === edge) {
          break;
        }
      }
      this.vertices[key].edges.incoming.splice(i, 1);
    }
  }

  return edge;
};

Graph.prototype.removeVertex = function (vertex) {
  var i = 0;
  var key = void 0;
  for (; i < vertex.edges.outgoing.length; ++i) {
    this.removeEdge(vertex.edges.outgoing[i]);
  }
  for (i = 0; i < vertex.edges.incoming.length; ++i) {
    this.removeEdge(vertex.edges.incoming[i]);
  }
  for (key in this.vertices) {
    if (this.vertices.hasOwnProperty(key)) {
      if (this.vertices[key] === vertex) {
        delete this.vertices[key];
        break;
      }
    }
  }

  return vertex;
};

Graph.prototype.getVertex = function (id) {
  return this.vertices[id];
};

Graph.prototype.clone = function () {
  var g = new Graph();

  var i = void 0;

  for (i in this.vertices) {
    if (this.vertices.hasOwnProperty(i)) {
      var v = this.vertices[i];
      g.addVertex(v.id, v._);
    }
  }
  for (i = 0; i < this.edges.length; ++i) {
    var e = this.edges[i];
    g.addEdge(e.weight, e.source, e.target, e._);
  }

  return g;
};