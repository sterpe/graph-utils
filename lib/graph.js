'use strict'

const Vertex = require('./vertex')
const Edge = require('./edge')

module.exports = Graph

function Graph () {
  this.edges = []
  this.vertices = {}
}

Graph.prototype.addVertex = function (id, data = null) {
  this.vertices[id] = new Vertex(id, data)

  return this.vertices[id]
}

Graph.prototype.setEdge = function (weight, sourceId, sourceIndex, targetId, targetIndex = 0, data = null) {
  const edge = new Edge(weight, sourceId, targetId, data)

  const oldEdge = this.vertices[sourceId].edges.outgoing[sourceIndex]

  if (oldEdge) {
    this.removeEdge(oldEdge)
  }
  this.edges.push(edge)
  this.vertices[sourceId].edges.outgoing.splice(sourceIndex, 0, edge)
  this.vertices[targetId].edges.incoming.splice(targetIndex, 0, edge)
}

Graph.prototype.addEdge = function (weight, source, target, data = null) {
  const edge = new Edge(weight, source, target, data)

  this.edges.push(edge)
  this.vertices[source].edges.outgoing.push(edge)
  this.vertices[target].edges.incoming.push(edge)

  return edge
}

Graph.prototype.removeEdge = function (edge) {
  let i = 0
  let key
  for (; i < this.edges.length; ++i) {
    if (this.edges[i] === edge) {
      break
    }
  }
  this.edges.splice(i, 1)
  for (key in this.vertices) {
    if (this.vertices.hasOwnProperty(key)) {
      for (i = 0; i < this.vertices[key].edges.outgoing.length; ++i) {
        if (this.vertices[key].edges.outgoing[i] === edge) {
          break
        }
      }
      this.vertices[key].edges.outgoing.splice(i, 1)
      for (i = 0; i < this.vertices[key].edges.incoming.length; ++i) {
        if (this.vertices[key].edges.incoming[i] === edge) {
          break
        }
      }
      this.vertices[key].edges.incoming.splice(i, 1)
    }
  }

  return edge
}

Graph.prototype.removeVertex = function (vertex) {
  let i = 0
  let key
  for (; i < vertex.edges.outgoing.length; ++i) {
    this.removeEdge(vertex.edges.outgoing[i])
  }
  for (i = 0; i < vertex.edges.incoming.length; ++i) {
    this.removeEdge(vertex.edges.incoming[i])
  }
  for (key in this.vertices) {
    if (this.vertices.hasOwnProperty(key)) {
      if (this.vertices[key] === vertex) {
        delete this.vertices[key]
        break
      }
    }
  }

  return vertex
}

Graph.prototype.getVertex = function (id) {
  return this.vertices[id]
}

Graph.prototype.clone = function () {
  const g = new Graph()

  let i

  for (i in this.vertices) {
    if (this.vertices.hasOwnProperty(i)) {
      let v = this.vertices[i]
      g.addVertex(v.id, v._)
    }
  }
  for (i = 0; i < this.edges.length; ++i) {
    let e = this.edges[i]
    g.addEdge(e.weight, e.source, e.target, e._)
  }

  return g
}
