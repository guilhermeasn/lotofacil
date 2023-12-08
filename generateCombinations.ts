function generateCombinations(amount : number, overall : number = 25) {
    
    let result : number[][] = [];

    function combineUtil(start : number = 0, combination : number[] = []) {

        if (combination.length === amount) {
            result.push([...combination]);
            return;
        }

        for (let i = start; i < overall; i++) {
            combination.push(i + 1);
            combineUtil(i + 1, combination);
            combination.pop();
        }

    }

    combineUtil();

    return result;
    
}

console.log(generateCombinations(3).join(' | '));
