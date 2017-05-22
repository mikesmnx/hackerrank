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

function geometricTrick(s){
    let n = s.length
    
    let cnt = 0
    
    let diff = 1;
    let jlim = 0
    let j = 0
    
    while(j < n) {
        jlim += diff
        diff += 2
        
        if (s[j++] == 'b') {
            let fs = factors(jlim)
        
            for (let q in fs) {
                let [i, k] = fs[q]
            
                if (s[i - 1] == 'a' && s[k - 1] == 'c') {
                    cnt++
                }
                else if (s[i - 1] == 'c' && s[k - 1] == 'a') {
                    cnt++
                }
            }
        }
    }
    
    return cnt
}

function factors(n) {
    let limit = Math.pow(n, 0.5)
    let factors = []
    
    for (let i = 1; i < limit; i++) {
        if (n % i == 0) {
            factors.push([i, n / i])
        }
    }
    
    return factors
}

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var result = geometricTrick(s);
    process.stdout.write(""+result+"\n");

}