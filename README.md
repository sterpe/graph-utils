# graph-utils

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## What is it?

### install
```
npm i --S graph-utils
```

### usage

#### graph api

The fundamental entry point is a graph.
```javascript
const grutils = require('graph-utils')

const g = new grutils.Graph()
```

##### Graph.addVertex(id:String, data:*=null):Vertex
Adds a new vertex to the graph and returns the reference.

```javascript
v = g.addVertex('1', 'foo')

g.vertices // { '1': Vertex { } }

v.id // '1'
v._ // 'foo'
v.edges.outgoing // []
v.edges.incoming // []
```
##### Graph.addEdge(weight:Number, sourceId:String, targetId:String, data:*=null):Edge
Adds a new edge to the graph originating from one vertex to another.
At your option, you may add some metadata to the edge.

```javascript
v1 = g.addVertex('1', 'SanFrancisco')
v2 = g.addVertex('2', 'Oakland')

e1 = g.addEdge(3.1, v1.id, v2.id, 'Bay Bridge')

e1._  // 'Bay Bridge'
e1.weight // 3.1
e1.source // '1'
e1.target // '2'

g.edges // [e]
v1.edges.outgoing // [e]
v2.edges.incoming // [e]
```
##### Graph.removeEdge(edge:Edge):Edge
Remove an edge from the graph by reference.  The edge
will be unlinked from `edge.source` and `edge.target`.
```javascript
// Bye-bye Bay Bridge!
g.removeEdge(e1)

g.edges // []
v1.edges.outgoing // []
v2.edges.incoming // []
```

##### Graph.removeVertex(vertex:Vertex):Vertex
Remove a vertex from the graph by reference.  Note that all edges 
that have this vertex as `edge.source` or `edge.target` will 
be removed from the graph as well.

```javascript
v1 = g.addVertex('1', 'SanFrancisco')
v2 = g.addVertex('2', 'Oakland')

e1 = g.addEdge(3.1, v1.id, v2.id, 'Bay Bridge')

// Bye-bye Oakland and Bay Bridge!
g.removeVertex(v2)

g.edges // []
g.vertices // { '1': Vertex { } }

v1.edges.outgoing // []
```
##### Graph.setEdge(weight:Number, sourceId:String, sourceIndex:Number, targetId:String, targetIndex:Number=0, data:*=null)
Replace a specific edge(s) in the graph: `g.getVertex(sourceId).edges.outgoing[sourceIndex]`
and link the new edge to `g.getVertex(targetId).edges.incoming[targetIndex]`.  You shouldn't 
need to call this directly, but it is used by the Tree/TreeNode implementation under the
covers.  See the [`lib/node.js`](lib/node.js) for more details.

#### tree/tree node api
The fundamental entries are trees and nodes, respectively. 
Underneath the hood the tree is implemented as a graph and
unfortunately it is required to pass the reference to the 
underlying `Graph` object as the first parameter when
constructing new trees and nodes.  Note that the underlying
vertex of a node has a reference to the node in `vertex._`.

```javascript
const grutils = require('graph-utils')

const g = new grutils.Graph()
const tree = new grutils.Tree(g, '1', { 'foo': 'bar' })
const node1 = new grutils.Node(g, '2', 'baz')

tree.root // Node { id: '1', _: { 'foo': 'bar' } }
node1 // Node { id: '2', _: 'baz' }

g.vertices // { '1': Vertex { }, '2': Vertex { } }

tree.root.left = node1

tree.root.left // Node { id: '2', _: 'baz' }

g.edges // [ Edge { weight: 1, source: '1', target: '2' } ]
```

### Note that while some core functionality is there, this project is still very much a work in progress.
## How do I work on it?

### development
```
git clone https://github.com/sterpe/graph-utils.git
cd graph-utils
make
```

### build
```
make build
```
### test
```
make JEST_FLAGS=--coverage test
```

### lint
```
make lint
```

Consult the [`Makefile`](Makefile) for further details.
