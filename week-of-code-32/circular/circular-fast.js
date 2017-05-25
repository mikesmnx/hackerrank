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

const circularWalk = (n, s, t, r_0, g, seed, p) => {

    let cur = r_0
    
    // JS array.push is too slow for this challenge, lets make an empty 
    // array (n-size)
    let nums = Array(n)
    nums = [cur]

    let search = Array(n)

    let ns = n

    let k = 1
    while (ns-- > 1) {
        cur = (cur * g + seed) % p
        
        // this is slow
        // nums.push(cur)
        
        nums[k++] = cur
    }

    if (s == t) {
        return 0
    }

    let leftBound = 0
    let rightBound = 0

    // lets make a new array, starting from s-point
    for (let i = s, k = 0; i < n + s; i++) {
        let idx = i % n

        // this is slow
        // search.push(nums[idx])

        // this is faster
        search[k++] = nums[idx]
    }
    
    // we need to convert t-point now
    t = (t - s + n) % n

    // iterating througn search arr and changing left and right bounds
    // according to curr value
    // we need to catch t inside our range
    for (let i = 0; i <= n; i++) {

        if (t <= rightBound || t >= n + leftBound) {
            return i
        }

        let prevLeftBound = leftBound
        let prevRightBound = rightBound

        for (let j = prevLeftBound; j < 0; j++) {
            if (search[j + n] == -1) {
                break
            }
            else {
                leftBound = Math.min(leftBound, j - search[j + n])
                rightBound = Math.max(rightBound, j + search[j + n])

                search[j + n] = -1
            }
        }

        for (let j = prevRightBound; j >= 0; j--) {
            if (search[j] == -1) {
                break
            }
            else {
                leftBound = Math.min(leftBound, j - search[j])
                rightBound = Math.max(rightBound, j + search[j])

                search[j] = -1
            }
        }

    }

    return -1
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