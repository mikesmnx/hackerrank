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

/////////////// solution ////////////////////

function solve(a) {
    // no need to calc, this case is automatically correct
    if (a.length == 1) {
        return 'YES'
    }
    
    // simple solution:
    // let sum of left part = 0 and sum of right part = sum of all elements
    // iterate over array and check if current index is suitable
    
    let leftPart = 0
    let rightPart = a.reduce((sum, current) => {
        return sum + current
    }, 0)
    
    for (let k = 0; k < a.length; k++) {
        rightPart -= a[k]
        
        if (leftPart == rightPart) {
            return 'YES'
        }
        
        leftPart += a[k]
    }
    
    return 'NO'
}
         
/////////////// solution ////////////////////
         
/////////////// default hackerrank stuff ////////////////////

function main() {
    var T = parseInt(readLine());
    for(var a0 = 0; a0 < T; a0++){
        var n = parseInt(readLine());
        a = readLine().split(' ');
        a = a.map(Number);
        var result = solve(a);
        process.stdout.write(""+result+"\n");
    }

}