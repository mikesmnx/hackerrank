/*

structure of our graph

[
{
    visited: false  // (was node viseted during bfs),
    links: [ ]      // array of nodes linked with this one
    len: -1         // length of path to given node (-1 if no path exists, 0 for given node itself)
},
{
    ...
},
...
{
    ...
}
]

*/

// length of edge
const EDGE_LENGTH = 6

class Graph {
    constructor(nodes) {
        this.graph = []
        
        // lets create an empty graph
        for (let k = 0; k < nodes; k++) {
            this.graph.push({
                visited: false,
                links: [],
                len: -1
            })
        }
    }
    
    addEdge(vertex, connectedTo) {
        this.graph[vertex - 1].links.push(connectedTo - 1)
    }
    
    bfs(start) {
        // we will store in the queue not only the node, but the length of path to given one
        // classic bfs algorithm 
        let queue = [{ start: start - 1, len: -1}]
        
        this.graph[start - 1].visited = true
        
        while (queue.length > 0) {
            let node = queue.shift()
            let len = node.len + 1
            
            // given node, len = 0
            if (node.start == start - 1) {
                this.graph[node.start].len = 0
            }
            else {
                this.graph[node.start].len = len
            }
                
            for (let k of this.graph[node.start].links) {
                if (!this.graph[k].visited) {
                    this.graph[k].visited = true
                    queue.push({ start: k, len: len })
                }
            }
        }
    }
    
    // iterate over all nodes and show result as requested
    show() {
        let last = this.graph.length - 1
        let result = ''
        
        for (let n in this.graph) {
            if (this.graph[n].len > 0) {
                result += this.graph[n].len * EDGE_LENGTH
            }
            else if (this.graph[n].len == -1) {
                result += this.graph[n].len
            }

            if (n != last && this.graph[n].len) {
                result += ' '
            }
        }

        console.log(result)
    }
}

function processData(input) {
    let data = input.split('\n')
    
    let graph
    let newGraph = true
    
    for (let k = 1; k < data.length; k++) {
        let parts = data[k].split(' ').map(Number)
        
        if (newGraph) {
            graph = new Graph(parts[0])
            newGraph = false
            
            continue
        }
        
        if (parts.length == 1) {
            newGraph = true
            
            // let's find paths
            graph.bfs(parts[0])
            
            // and print them
            graph.show()
        }
        else {
            
            // add edges to our graph
            graph.addEdge(parts[0], parts[1])
            graph.addEdge(parts[1], parts[0])
        }
    }
}

// default hackerrank stuff

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});