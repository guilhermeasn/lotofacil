import { writeFile } from "node:fs/promises";
import forEach from "object-as-array/forEach";
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

async function avail(file : string, start ?: number, end ?: number) : Promise<void> {

    const combinations : number[][] = generateCombinations(15, 25);

    await writeFile(file, '');

    for(let key in combinations) {

        const index : number = parseInt(<string>key) + 1;

        if(start && start > index) continue;
        if(end && end < index) break;
        
        if(!(index % 1000)) console.log(index + ' combinations processed');

        const analise : Acertos = analisar(...combinations[key]);

        const combination : string = combinations[key].join('-');
        const analiseStr : string = reduce(analise, (p, v, k) => `${p} | ${k}:${v}`, '');
        const score : number = Math.round(reduce(analise, (p, v, k) => p + (v * ((k ** 5) / 100000)), 0));

        await writeFile(
            file,
            `${index} => ${combination}${analiseStr} | ${score.toString()}pts\n`,
            { flag: 'a+' }
        );

    }

    console.log('finally');

}

function cmd() {

    const file : string  = process.argv[2];
    const start : number = parseInt(process.argv[3]);
    const end : number   = parseInt(process.argv[4]);

    if(!file || isNaN(start) || isNaN(end)) throw new Error('Incorrect parameters');

    console.log(file, start, end);
    avail(file, start, end);

}

cmd();
