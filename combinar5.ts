export type Combinacao5 = `${number}-${number}-${number}-${number}-${number}`;
export type Combinacoes5 = Record<Combinacao5, number>;

export default function combine5() : Combinacoes5 {

    const combinacoes : Combinacoes5 = {};

    // inicio 1-2-3-4-5
    // final 21-22-23-24-25

    for(let a = 1; a <= 21; a++) {
        for(let b = a + 1; b <= 22; b++) {
            for(let c = b + 1; c <= 23; c++) {
                for(let d = c + 1; d <= 24; d++) {
                    for(let e = d + 1; e <= 25; e++) {
                        combinacoes[`${a}-${b}-${c}-${d}-${e}`] = 0;
                    }
                }
            }
        }
    }

    console.log(Object.keys(combinacoes).length);
    return combinacoes;

}

// combine5();
