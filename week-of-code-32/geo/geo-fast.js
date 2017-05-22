// based on this explanation https://www.hackerrank.com/contests/w32/challenges/geometric-trick/forum/comments/305394
// plus https://www.hackerrank.com/contests/w32/challenges/geometric-trick/forum/comments/305383

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

    let keys = {}
    let result = 0
    
    for (let i1 = 1; i1 * i1 <= n; i1++) {
        let i2 = i1 * i1

        for (let k1 = i1 + 1; k1 * k1 <= n; k1++) {
            let k2 = k1 * k1
            let j2 = i1 * k1

            let a = 0
            while(++a) {
                let k = k2 * a 
                let i = i2 * a
                let j = j2 * a

                if (k > n || i > n || j > n) {
                    break
                }

                if (s[j - 1] == 'b') {
                    if ((s[i - 1] == 'a' && s[k - 1] == 'c') || (s[i - 1] == 'c' && s[k - 1] == 'a')) {
                        
                        let key = (i - 1) + '_' +  (j - 1) + '_' + (k - 1)
                        if (typeof keys[key] === 'undefined') {
                            result++

                            keys[key] = 1
                        }
                    }
                }

            }
        }
    }

    return result
}

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var t1 = +new Date()
    var result = geometricTrick(s);
    process.stdout.write("" + result + "\n");
}