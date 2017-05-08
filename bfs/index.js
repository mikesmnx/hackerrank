class Graph {
    constructor(nodes) {
        this.graph = []
        
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
        let queue = [{ start: start - 1, len: -1}]
        
        this.graph[start - 1].visited = true
        
        while (queue.length > 0) {
            let node = queue.shift()
            let len = node.len + 1
            
            // start node, len = 0
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
    
    show() {
        let res = []
        for (let n in this.graph) {
            if (this.graph[n].len > 0) {
                res.push(this.graph[n].len * 6)
            }
            else if (this.graph[n].len == -1) {
                res.push(this.graph[n].len)
            }
        }
        
        console.log(res.join(' '))
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

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});