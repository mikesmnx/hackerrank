"use strict";

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
    constructor(n) {
        this.graph = []
        
        for (let k = 0; k < n; k++) {
            this.graph.push({
                visited: false,
                len: -1
            })
        }
    }
    
    getLinks(pos, t) {
        let steps = nums[pos]
        let links = []
        
        if (steps == 0) {
            return links
        }
        
        let start = pos - steps
        if (start < 0) {
            start = this.graph.length + start
        }
        
        let end = (start + steps * 2) % this.graph.length
        
        for (let k = 0; k <= steps * 2; k++) {
            let i = (start + k) % this.graph.length
            
            if (!this.graph[i].visited && nums[i]) {
                links.push(i)
            }
        }
        
        return links
    }
    
    bfs(start, stop) {
        let queue = [{ start: start, len: -1}]
        
        this.graph[start].visited = true
        
        if (start == stop) {
            return 0
        }
        
        let bfsidx = 0
        while (bfsidx < queue.length) {
            let node = queue[bfsidx++]
            let len = node.len + 1
            
            if (node.start == stop) {
                return len
            }
            
            let currentLinks = this.getLinks(node.start, stop)
            
            for (let k of currentLinks) {
                if (!this.graph[k].visited) {
                    if (k == stop) {
                        return (len + 1)
                    }
                    
                    this.graph[k].visited = true
                    queue.push({ start: k, len: len })
                }
            }
        }
        
        return -1
    }
}

var nums;

function circularWalk(n, s, t, r_0, g, seed, p){
    let graph = new Graph(n)
    
    let cur = r_0
    nums = [cur]
    let limit = p
    while (n-- > 1) {
        cur = (cur * g + seed) % p
        
        nums.push(cur)
    }
    
    return graph.bfs(s, t)
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var s = parseInt(n_temp[1]);
    var t = parseInt(n_temp[2]);
    var r_0_temp = readLine().split(' ');
    var r_0 = parseInt(r_0_temp[0]);
    var g = parseInt(r_0_temp[1]);
    var seed = parseInt(r_0_temp[2]);
    var p = parseInt(r_0_temp[3]);
    var result = circularWalk(n, s, t, r_0, g, seed, p);
    process.stdout.write(""+result+"\n");

}