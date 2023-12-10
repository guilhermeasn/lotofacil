import { writeFile } from "node:fs/promises";
import forEach from "object-as-array/forEach";
import forEachAsync from "object-as-array/forEachAsync";
import reduce from "object-as-array/reduce";
import results from './resultados_1_2974.json';

function generateCombinations(amount : number, overall : number = 25) : number[][] {
    
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

function test() : void {
    console.log(generateCombinations(3).map((raffle, key) => `${key + 1} => ${raffle.join(' ')}`).join('\n'));
}

type Acertos = Record<number, number>;

function analisar(...n : number[]) : Acertos {

    const acertos : Acertos = {};

    for(let c = 5; c <= 15; c++) acertos[c] = 0;

    forEach(results, sorteio => {
        const c = sorteio.reduce((p, c) => n.some(v => v === parseInt(c)) ? p + 1 : p, 0);
        acertos[c]++;
    });

    return acertos;
    

}

async function avail(continueOf ?: number, stopIn ?: number) : Promise<void> {

    const combinations : number[][] = generateCombinations(15, 25);

    if(!continueOf) await writeFile('todos.txt', '');

    await forEachAsync(combinations, async (raffle, key) => {

        const index : number = parseInt(<string>key) + 1;

        if((!continueOf || index > continueOf) && (!stopIn || index <= stopIn)) {

            const analise = analisar(...(raffle as number[]));

            await writeFile(
                'todos.txt',
                `${index} => ${(raffle as number[]).join('-')}${reduce(analise, (p, v, k) => `${p} | ${k}:${v}`, '')}\n`,
                { flag: 'a+' }
            );

        }

    });

}

avail(780000);
