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

function commonChild(s1, s2){
    if (!s1.length || !s2.length) {
        return 0
    }
    
    // dynamic programming: based on longest common substring problem
    // with few changes
    let mtx = Array(s1.length + 1)
    for (let k = 0; k <= s1.length; k++) {
        mtx[k] = Array(s2.length + 1).fill(0)
    }

    for (let k = 1; k <= s1.length; k++) {
        for (let j = 1; j <= s2.length; j++) {
            
            // equal symbols in strings, inc cur substr length
            if (s1[k - 1] == s2[j - 1]) {
                mtx[k][j] = 1 + mtx[k - 1][j - 1]
            }
            // not equal, getting max value from prev steps
            else {
                mtx[k][j] = Math.max(mtx[k][j - 1], mtx[k - 1][j])
            }
        }
    }

    return mtx[s1.length][s2.length]
}

function main() {
    var s1 = readLine()
    var s2 = readLine()
    var result = commonChild(s1, s2)
    process.stdout.write("" + result + "\n")

}