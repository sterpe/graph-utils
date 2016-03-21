'use strict';

var Vertex = require('./vertex');
var Edge = require('./edge');

function Node(graph, id, data) {
	this.id = id;
	this._ = data;
	this._graph = graph;
	this._graph.addVertex(id, this);
	Object.defineProperty(this, 'right', {
		get: function get() {
			return this._getChildNode(1);
		},
		set: function set(node) {
			this._graph.setEdge(1, this.id, 1, node.id);
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(this, 'left', {
		get: function get() {
			return this._getChildNode(0);
		},
		set: function set(node) {
			this._graph.setEdge(1, this.id, 0, node.id);
		},
		enumerable: true,
		configurable: true
	});
}

Node.prototype._getChildNode = function (index) {
	var vertex = this._graph.getVertex(this.id);
	var edge = vertex.edges.outgoing[index];
	var target = edge && edge.target;
	return target && this._graph.getVertex(target)._ || null;
};

Node.prototype.destroy = function () {
	var vertex = this._graph.getVertex(this.id);
	return this._graph.removeVertex(vertex);
};

module.exports = Node;