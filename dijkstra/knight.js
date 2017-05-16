/////////////// default hackerrank stuff ////////////////////

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

class Graph {
    // creating empty graph of (n * n) vertices
    constructor(n) {
        this.graph = []
        this.height = n
        
        for (let k = 0; k < n * n; k++) {
            this.graph.push({
                prev: null,
                distance: Infinity
            })
        }
    }
    
    // get connected vertices
    // input: coords(x, y); a, b - allowed movements from initial position
    // output: array of available (connected) matrix cells [numbers: (x1 * columns + y1)]
    getLinks(x, y, a, b) {
        let links = []
        
        if (x - a >= 0) {
            if (y - b >= 0) {
                links.push([x - a, y - b])
            }
            
            if (y + b <= this.height - 1) {
                links.push([x - a, y + b])
            }
        }
        
        if (x - b >= 0) {
            if (y - a >= 0) {
                links.push([x - b, y - a])
            }
            
            if (y + a <= this.height - 1) {
                links.push([x - b, y + a])
            }
        }
        
        if (x + a <= this.height - 1) {
            if (y - b >= 0) {
                links.push([x + a, y - b])
            }
            
            if (y + b <= this.height - 1) {
                links.push([x + a, y + b])
            }
        }
        
        if (x + b <= this.height - 1) {
            if (y - a >= 0) {
                links.push([x + b, y - a])
            }
            
            if (y + a <= this.height - 1) {
                links.push([x + b, y + a])
            }
        }
        
        // converting coords [x, y] to number
        // and deleting dupes
        return links.reduce((links, current) => {
            let idx = current[0] * this.height + current[1]
            
            if (links.indexOf(idx) == -1) {
                links.push(idx)
            }
            
            return links
        }, [])
    }
    
    searchPath(a, b) {
        // start: always [0, 0]
        // finish: always [n-1, n-1]
        // only permitted movements (a, b) differ
        
        // adding all nodes to the queue
        let queue = this.graph.reduce((q, current, idx) => {
            q.push(idx)
            
            return q
        }, [])
        
        // initial distance
        this.graph[0].distance = 0
        
        let pathFound = false
        let current = {}
        
        while (queue.length > 0) {
            // getting node with min distance from the queue
            let min = queue.reduce((min, current, index) => {
                if (this.graph[min.item].distance >= this.graph[current].distance) {
                    return {
                        idx: index,
                        item: current
                    }
                }
                else {
                    return min
                }
            }, { idx: 0, item: queue[0] })
            
            // working with the closest node now
            current = this.graph[min.item]
            
            // this is the node we're trying to find
            if (min.item == this.height * this.height - 1) {
                pathFound = true
                
                break
            }
            
            // updating distance for every child of current node
            // setting current node as previous in path if new distance is lower
            let currentDistance = current.distance + 1
            let currentX = Math.floor(min.item / this.height)
            let currentY = min.item - currentX * this.height
            let currentLinks = this.getLinks(currentX, currentY, a, b)
            
            for (let k of currentLinks) {
                if (this.graph[k].distance > currentDistance) {
                    this.graph[k].distance = currentDistance
                    this.graph[k].prev = min.item
                }
            }
            
            queue.splice(min.idx, 1)
        }
        
        if (pathFound && current.distance != Infinity) {
            return current.distance
        }
        else {
            return -1
        }
    }
}

/////////////// default hackerrank stuff ////////////////////

function main() {
    var n = parseInt(readLine());
    
    for (let k = 1; k < n; k++) {
        
        let line = []
        for (let j = 1; j < n; j++) {
            let graph = new Graph(n)
            
            line.push(graph.searchPath(k, j))
        }
        
        console.log(line.join(' '))
    }
}