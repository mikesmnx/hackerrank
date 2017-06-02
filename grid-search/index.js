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

const findStartPositions = (str, substr) => {
    let res = {}
    
    let pos_found = false

    let i = str.indexOf(substr)
    while (i > -1) {
        res[i] = 1
        pos_found = true

        i = str.indexOf(substr, i + 1)
    }

    if (!Object.keys(res).length) {
        return null
    }

    return res
}

const findPattern = (g, p) => {
    // all available start positions within grid line for the first pattern line
    let start_indices = {}

    // are we searching for new pattern
    let new_pattern = true

    // pattern line index
    let pi = 0

    for (let k = 0; k <g.length; k++) {
        if (new_pattern) {
            // getting all available start positons
            start_indices = findStartPositions(g[k], p[pi])

            if (start_indices != null) {
                new_pattern = false
                pi++
            }
        }
        else {
            // getting all available start positions for current pattern line
            let new_indices = findStartPositions(g[k], p[pi++])

            // removing from initial start positions unused ones
            for (let j in start_indices) {
                if (new_indices != null && typeof new_indices[j] === 'undefined') {
                    delete start_indices[j]
                }
            }

            // if there are no start positions, then we should start over again
            // we need to test current grid line again (not for current pattern
            // line but the first line)
            if (new_indices != null && Object.keys(start_indices).length > 0) {
                if (pi == p.length) {
                    return 'YES'
                }
            }
            else {
                pi = 0
                new_pattern = true
                k--
            }
        }
    }
    
    return 'NO'
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var R_temp = readLine().split(' ');
        var R = parseInt(R_temp[0]);
        var C = parseInt(R_temp[1]);
        var G = [];
        for(var G_i = 0; G_i < R; G_i++){
           G[G_i] = readLine();
        }
        var r_temp = readLine().split(' ');
        var r = parseInt(r_temp[0]);
        var c = parseInt(r_temp[1]);
        var P = [];
        for(var P_i = 0; P_i < r; P_i++){
           P[P_i] = readLine();
        }
        
        console.log(findPattern(G, P))
    }

}