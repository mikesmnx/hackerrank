function processData(input) {
    let [str1, str2] = input.split('\n')
    
    // first iteration - increment frequences of first string
    let frequences = str1.split('').reduce((freqs, current) => {
        // 97 - char code of 'a'
        freqs[(current.charCodeAt(0) - 97)]++
        
        return freqs
    }, new Array(26).fill(0))
    
    // second iteration - decrement frequences of second string
    frequences = str2.split('').reduce((freqs, current) => {
        freqs[(current.charCodeAt(0) - 97)]--
        
        return freqs
    }, frequences)
    
    // count result
    let result = frequences.reduce((res, current) => {
        return res + Math.abs(current)
    }, 0)
    
    return result
} 

// default hackerrank stuff

process.stdin.resume()
process.stdin.setEncoding("ascii")
_input = ""
process.stdin.on("data", function (input) {
    _input += input
});

process.stdin.on("end", function () {
   console.log(processData(_input))
});
