import forEach from "object-as-array/forEach";

export function factorial(num : number) : number {
    let calc : number = num;
    while(num > 1) calc *= --num;
    return calc;
}

export function combinatorics(amount : number, overall : number) : number {

    const f1 = factorial(overall);
    const f2 = factorial(amount);
    const f3 = factorial(overall - amount);

    return Math.round(f1 / (f2 * f3));

}

export function betQuantity(balls : number) : number {
    return balls > 15 ? combinatorics(15, balls) : balls === 15 ? 1 : 0;
}

export const totalBets : number = combinatorics(15, 25);

export function probability(quantity : number) : number {
    return quantity > 0 ? Math.round(totalBets / quantity) : 0;
}

export function probabilityLevel(probability : number) : 1|2|3|4|5 {

    if(probability < 1) return 5;

    return probability <= totalBets / 10000 ? 1 :
           probability <= totalBets / 1000 ? 2 :
           probability <= totalBets / 100 ? 3 :
           probability <= totalBets / 10 ? 4 : 5;

}

export function match(bet : number[], raffle : number[]) : number {
    return bet.reduce((sum, num1) => raffle.some(num2 => num1 === num2) ? sum + 1 : sum ,0);
}

export function matches(bet : number[], raffles : number[][]) : Record<number, number> {

    const result : Record<number, number> = {};

    raffles.forEach(raffle => {
        let hit : number = match(bet, raffle);
        (hit in result) ? result[hit]++ : result[hit] = 1;
    });

    return result;

}

export function whoMatches(bet : number[], raffles : Record<number, number[]>) : Record<number, number[]> {

    const result : Record<number, number[]> = {};

     forEach(raffles, (raffle, num) => {
        let hit : number = match(bet, raffle);
        if(!(hit in result)) result[hit] = [];
        result[hit].push(num);
    });

    return result;

}

export function numberOfCombination(sequence : number[], overall : number = 25) : number {

    let count : number = 0;
    let result : number = 0;

    function combine(start : number = 1, combination : number[] = []) {

        if (combination.length === sequence.length) {
            ++count;

            if(combination.every(n => sequence.some(s => s === n))) {
                result = count;
            }

            return;
        }

        for (let i = start; i <= overall; i++) {
            combination.push(i);
            if(result > 0) return;
            combine(i + 1, combination);
            combination.pop();
        }

    }

    combine();

    return result;

}

export function sum(bet : number[]) : number {
    return bet.reduce((total, num) => total + num, 0);
}

export function mean(bet : number[]) : number {
    return Math.round(sum(bet) / bet.length);
}

export function pairs(bet : number[]) : number {
    return bet.reduce((total, num) => num % 2 === 0 ? total + 1 : total, 0);
}

function isPrime(num : number) : boolean {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
};

export function primes(bet : number[]) : number {
    return bet.reduce((total, num) => isPrime(num) ? total + 1 : total, 0);
}
