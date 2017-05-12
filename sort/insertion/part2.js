function processData(input) {
    let data = input.split('\n')
    let arr = data[1].split(' ').map(Number)
    
    // simple classic insertion sort
    for (let k = 1; k < arr.length; k++) {
        let j = k
        
        while (j > 0 && arr[j - 1] > arr[j]) {
            let tmp = arr[j]
            arr[j] = arr[j - 1]
            arr[j - 1] = tmp
            
            j--
        }
        
        console.log(arr.join(' '))
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