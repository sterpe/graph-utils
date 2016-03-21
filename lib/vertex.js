'use strict'

module.exports = function Vertex (id, data = null) {
  this._ = data
  this.id = id
  this.edges = {
    incoming: [],
    outgoing: []
  }
}
