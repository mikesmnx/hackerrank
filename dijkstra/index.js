class Graph {
    constructor(nodes) {
        this.graph = []
        
        // lets create an empty graph
        for (let k = 0; k < nodes; k++) {
            this.graph.push({
                prev: null,
                links: [],
                distance: Infinity
            })
        }
    }
    
    addEdge(vertex, connectedTo) {
        this.graph[vertex].links.push(connectedTo)
    }
    
    setVertex(id, data) {
        Object.assign(this.graph[id], data)
    }
    
    // Dijkstra algorithm
    // node with type '*' - end point
    searchPath(start, luckyNumber) {
        // adding all nodes to the queue
        let queue = this.graph.reduce((q, current, idx) => {
            q.push(idx)
            
            return q
        }, [])
        
        // initial distance (from the starting poing to the starting point)
        this.graph[start].distance = 0
        
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
            
            // we at the end, path finally found
            if (current.type == '*') {
                pathFound = true
                
                break
            }
            
            // updating distance for every child of current node
            // setting current node as previous in path if new distance is lower
            let currentDistance = current.distance + 1
            for (let k of current.links) {
                if (this.graph[k].distance > currentDistance) {
                    this.graph[k].distance = currentDistance
                    this.graph[k].prev = min.item
                }
            }
            
            // deleting current node from the queue
            queue.splice(min.idx, 1)

            //repeat now while queue is not empty
        }
        
        // path found, count all crossroads now
        if (pathFound) {
            let crossroads = 0
            // going backwards to starting point
            while (current.prev != null) {
                current = this.graph[current.prev]

                if (current.links.length > 2 || (current.links.length > 1 && current.prev == null)) {
                    crossroads++
                }
            }
            
            if (crossroads == luckyNumber) {
                return 'Impressed'
            }
            else {
                return 'Oops!'
            }
        }
        else {
            // no way found
            return 'Oops!'
        }
    }
}

// mostly forest population part
function processData(input) {
    let data = input.split('\n')
    
    let forest
    
    let forestRows, forestCols, startRow, startCol
    let luckyNumber = 0
    let rowLimit = 0
    let prevRow = []
    let newForest = true
    
    for (let k = 1; k < data.length; k++) {
        let parts = data[k].split(' ')
        
        // init vars if new forest is about to populate
        if (newForest) {
            [forestRows, forestCols] = parts.map(Number)
            rowLimit = 0
            prevRow = []
            
            forest = new Graph(forestRows * forestCols)
            newForest = false
            
            continue
        }
        
        // fill the graph
        if (rowLimit < forestRows) {
            let row = parts[0].split('')
            let prevCell = ''
            for (let k in row) {
                k = Number(k)
                let curId = (rowLimit * forestCols) + k
                
                if (k in prevRow) {
                    // top neighbour is road
                    if (prevRow[k] != 'X' && row[k] != 'X') {
                        forest.addEdge(curId, curId - forestCols)
                        forest.addEdge(curId - forestCols, curId)
                    }
                }
                
                // left neighbour is road
                if (prevCell && prevCell != 'X' && row[k] != 'X') {
                    forest.addEdge(curId, curId - 1)
                    forest.addEdge(curId - 1, curId)
                }
                
                // adding type of point
                forest.setVertex(curId, { type: row[k] })
                
                prevCell = row[k]
                
                if (row[k] == 'M') {
                    startRow = rowLimit
                    startCol = k
                }
            }
            
            prevRow = row
        }
        else {
            // we need to compare with this num
            luckyNumber = parts[0]
            // print answer
            console.log(forest.searchPath(startRow * forestCols + startCol, Number(luckyNumber)))

            // lets start new forest on next iteration
            newForest = true
        }
        
        rowLimit++
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