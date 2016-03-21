const Node = require('./node')

function Tree (graph, rootId, rootData) {
	this.graph = graph
	this.root = new Node(graph, rootId, rootData)
}

module.exports = Tree
