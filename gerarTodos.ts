import { writeFile } from 'node:fs/promises';

async function gerarTodos() {

    await writeFile('todos.json', '{\n');

    for(let n01 = 1; n01 <= 11; n01++) {
        for(let n02 = n01 + 1; n02 <= 12; n02++) {
            for(let n03 = n02 + 1; n03 <= 13; n03++) {
                for(let n04 = n03 + 1; n04 <= 14; n04++) {
                    for(let n05 = n04 + 1; n05 <= 15; n05++) {
                        for(let n06 = n05 + 1; n06 <= 16; n06++) {
                            for(let n07 = n06 + 1; n07 <= 17; n07++) {
                                for(let n08 = n07 + 1; n08 <= 18; n08++) {
                                    for(let n09 = n08 + 1; n09 <= 19; n09++) {
                                        for(let n10 = n09 + 1; n10 <= 20; n10++) {
                                            for(let n11 = n10 + 1; n11 <= 21; n11++) {
                                                for(let n12 = n11 + 1; n12 <= 22; n12++) {
                                                    for(let n13 = n12 + 1; n13 <= 23; n13++) {
                                                        for(let n14 = n13 + 1; n14 <= 24; n14++) {
                                                            for(let n15 = n14 + 1; n15 <= 25; n15++) {

                                                                const jogo = `\t"${n01}-${n02}-${n03}-${n04}-${n05}-${n06}-${n07}-${n08}-${n09}-${n10}-${n11}-${n12}-${n13}-${n14}-${n15}": {},\n`;
                                                                await writeFile('todos.json', jogo, { flag: 'a+' });
                                                                console.log(jogo);

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

    await writeFile('todos.json', '}', { flag: 'a+' });

}

gerarTodos().then(() => console.log('fim'));
