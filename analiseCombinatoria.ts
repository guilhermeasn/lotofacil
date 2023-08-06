import { writeFileSync } from "fs";

function fatorial(n : number) : number {

    let r = n;

    while(n > 1) {
        r *= --n
    }

    return r;

}

function combinatoria(n : number, p : number) : number {

    const f1 = fatorial(n);
    const f2 = fatorial(p);
    const f3 = fatorial(n - p);

    return Math.round(f1 / (f2 * f3));

}

const analises : Record<number, number> = {};

for(let c = 1; c < 25; c++) {
    analises[c] = combinatoria(25, c);
}

writeFileSync('analise.json', JSON.stringify(analises, undefined, 2));
