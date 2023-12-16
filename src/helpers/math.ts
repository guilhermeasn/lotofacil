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

export function bets(quantity : number) : number {
    if(quantity < 15) throw new Error('A quantidade mínima de números para uma aposta são 15!');
    return quantity > 15 ? combinatorics(15, quantity) : 1;
}
