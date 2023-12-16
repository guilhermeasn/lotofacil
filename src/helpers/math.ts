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
