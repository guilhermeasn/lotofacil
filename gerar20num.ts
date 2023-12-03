import { writeFile } from 'node:fs/promises';
import forEach from 'object-as-array/forEach';
import reduce from 'object-as-array/reduce';
import resultados from './resultados_1_2968.json';

type Acertos = Record<number, number>;

function analisar(...n : number[]) : Acertos {

    const acertos : Acertos = {};

    for(let c = 5; c <= 15; c++) acertos[c] = 0;

    forEach(resultados, sorteio => {
        const c = sorteio.reduce((p, c) => n.some(v => v === parseInt(c)) ? p + 1 : p, 0);
        acertos[c]++;
    });

    return acertos;
    

}

async function gerarTodos20() {

    let content = '';
    let acc = 0;

    await writeFile('todos20.txt', '');

    for(let n01 = 1; n01 <= 6; n01++) {
        for(let n02 = n01 + 1; n02 <= 7; n02++) {
            for(let n03 = n02 + 1; n03 <= 8; n03++) {
                for(let n04 = n03 + 1; n04 <= 9; n04++) {
                    for(let n05 = n04 + 1; n05 <= 10; n05++) {
                        for(let n06 = n05 + 1; n06 <= 11; n06++) {
                            for(let n07 = n06 + 1; n07 <= 12; n07++) {
                                for(let n08 = n07 + 1; n08 <= 13; n08++) {
                                    for(let n09 = n08 + 1; n09 <= 14; n09++) {
                                        for(let n10 = n09 + 1; n10 <= 15; n10++) {
                                            for(let n11 = n10 + 1; n11 <= 16; n11++) {
                                                for(let n12 = n11 + 1; n12 <= 17; n12++) {
                                                    for(let n13 = n12 + 1; n13 <= 18; n13++) {
                                                        for(let n14 = n13 + 1; n14 <= 19; n14++) {
                                                            for(let n15 = n14 + 1; n15 <= 20; n15++) {
                                                                for(let n16 = n15 + 1; n16 <= 21; n16++) {
                                                                    for(let n17 = n16 + 1; n17 <= 22; n17++) {
                                                                        for(let n18 = n17 + 1; n18 <= 23; n18++) {
                                                                            for(let n19 = n18 + 1; n19 <= 24; n19++) {
                                                                                for(let n20 = n19 + 1; n20 <= 25; n20++) {

                                                                                    const jogo = `${n01}-${n02}-${n03}-${n04}-${n05}-${n06}-${n07}-${n08}-${n09}-${n10}-${n11}-${n12}-${n13}-${n14}-${n15}-${n16}-${n17}-${n18}-${n19}-${n20}`;
                                                                                    const analise = analisar(n01, n02, n03, n04, n05, n06, n07, n08, n09, n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, n20);

                                                                                    content += jogo + reduce(analise, (p, v, k) => `${p} | ${k}:${v}`, '') + '\n';

                                                                                    if(++acc >= 999) {

                                                                                        await writeFile('todos20.txt', content, { flag: 'a+' });
                                                                                        console.log(content);
                                                                                        content = '';
                                                                                        acc = 0;

                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                }

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

gerarTodos20().then(() => console.log('fim'));
