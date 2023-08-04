export type Combinacao = `${number}-${number}-${number}`;
export type Combinacoes = Record<Combinacao, number>;

export default function combine() : Combinacoes {

    const combinacoes : Combinacoes = {};

    // inicio 1-2-3
    // final 23-24-25

    for(let a = 1; a <= 23; a++) {
        for(let b = a + 1; b <= 24; b++) {
            for(let c = b + 1; c <= 25; c ++) {
                combinacoes[`${a}-${b}-${c}`] = 0;
            }
        }
    }

    console.log(Object.keys(combinacoes).length);
    return combinacoes;

}
