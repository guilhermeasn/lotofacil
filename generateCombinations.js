function generateCombinations(k, r) {
    
    const arr = Array.from({ length: k }, (_, i) => i + 1);
    const result = [];

    function combineUtil(start, combination) {
        if (combination.length === r) {
            result.push(combination.join(' '));
            return;
        }

        for (let i = start; i < arr.length; i++) {
            combination.push(arr[i]);
            combineUtil(i + 1, combination);
            combination.pop();
        }
    }

    combineUtil(0, []);

    return result;
}

console.log(generateCombinations(25, 15).join('\n'));
