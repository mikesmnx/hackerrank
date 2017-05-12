function processData(input) {
    let data = input.split('\n')
    
    let n = Number(data[0])
    let arr = data[1].split(' ').map(Number)
    
    // given (it is last) element
    // slicing arr, we dont need given element
    let m = arr.pop()
    arr.slice(0, arr.length)
    
    let listIsSorted = false
    for (let k = 0; k <= arr.length; k++) {
        // arrs in js are references, so just copy
        let tmp = arr.slice()
        
        let curIdx = arr.length - k - 1
        
        // if element is bigger then clone it
        // otherwise use given one
        if (arr[curIdx] > m) {
            tmp.splice(curIdx, 0, arr[curIdx])
        }
        else {
            tmp.splice(curIdx + 1, 0, m)
            listIsSorted = true
        }
        
        console.log(tmp.join(' '))
        
        if (listIsSorted) {
            break
        }
    }
} 

// default hackerrank stuff

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
