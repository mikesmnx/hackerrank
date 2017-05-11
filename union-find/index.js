function processData(input) {
    // processing input data and filling initial matrix
    // adding 2 rows and 2 cols of zeroes to avoid boundary checks
    // 0000
    // 0110
    // 0000
    
    let data = input.split('\n')
    
    let rows = Number(data[0])
    let cols = Number(data[1])
    
    let matrix = []
    matrix.push(Array.apply(null, {length: cols + 2}).map(() => 0))
    
    for (let k = 2; k < rows + 2; k++) {
        let parts = data[k].split(' ').map(Number)
        
        matrix.push([0].concat(parts).concat([0]))
    }
    
    matrix.push(Array.apply(null, {length: cols + 2}).map(() => 0))
    
    // lets convert matrix to array
    let unions = Array.apply(null, {length: rows * cols}).map(Number.call, Number)
    
    // matrix is restricted to 10x10, so
    // using naive realisation, no usual union-find improvements
    let union = (unions, newVal, oldVal) => {
        return unions.map((val) => {
            if (val == oldVal) {
                return newVal
            }
            
            return val
        })
    }
    
    for (let k = 1; k <= rows; k++) {
        for (let j = 1; j <= cols; j++) {
            let curId = (k - 1) * cols + j - 1
            
            // cell is filled and have no parent
            // setting all the neighbours a new parent
            if (matrix[k][j] && unions[curId] == curId) {
                if (matrix[k - 1][j]) {
                    unions = union(unions, unions[curId - cols], unions[curId])
                }
                if (matrix[k + 1][j]) {
                    unions = union(unions, unions[curId + cols], unions[curId])
                }
                if (matrix[k][j + 1]) {
                    unions = union(unions, unions[curId + 1], unions[curId])
                }
                if (matrix[k][j - 1]) {
                    unions = union(unions, unions[curId - 1], unions[curId])
                }
                if (matrix[k - 1][j - 1]) {
                    unions = union(unions, unions[curId - cols - 1], unions[curId])
                }
                if (matrix[k + 1][j + 1]) {
                    unions = union(unions, unions[curId + cols + 1], unions[curId])
                }
                if (matrix[k + 1][j - 1]) {
                    unions = union(unions, unions[curId + cols - 1], unions[curId])
                }
                if (matrix[k - 1][j + 1]) {
                    unions = union(unions, unions[curId - cols + 1], unions[curId])
                }
            }
            
            if (!matrix[k][j]) {
                unions[curId] = -1
            }
        }
    }

    // counting frequences to determine max set
    let freqs = unions.reduce((freqs, current) => {
        if (current == -1) {
            return freqs
        }
        
        if (!(current in freqs)) {
            freqs[current] = 0
        }
        
        freqs[current]++
        
        return freqs
    }, {})
    
    let result = 0
    for (let k in freqs) {
        if (freqs[k] > result) {
            result = freqs[k]
        }
    }
    
    console.log(result)
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