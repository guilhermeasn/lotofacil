function generateCombinations(amount : number, overall : number = 25) {
    
    let result : number[][] = [];

    function combineUtil(start : number = 1, combination : number[] = []) {

        if (combination.length === amount) {
            result.push([...combination]);
            return;
        }

        for (let i = start; i <= overall; i++) {
            combination.push(i);
            combineUtil(i + 1, combination);
            combination.pop();
        }

    }

    combineUtil();

    return result;
    
}

let count = 0;
console.log(generateCombinations(3).map(raffle => `${++count} => ${raffle.join(' ')}`).join('\n'));
