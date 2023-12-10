import { writeFile } from 'fs/promises';
import { createInterface } from 'readline';

import filter from 'object-as-array/filter';
import forEach from 'object-as-array/forEach';
import keysMap from 'object-as-array/keysMap';
import reduce from 'object-as-array/reduce';
import some from 'object-as-array/some';

import resultados from './resultados_1_2968.json';
import numeros from './resultados_numbers_1_2968.json';
import diff from './resultados_numbers_diference_1_2968.json';

function numberOfCombination(sequence : number[], overall : number = 25) : number {

    let count : number = 0;
    let result : number = 0;

    function combineUtil(start : number = 1, combination : number[] = []) {

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
            combineUtil(i + 1, combination);
            combination.pop();
        }

    }

    combineUtil()

    return result;

}

function combinationOfNumber(num : number, amount : number = 15, overall : number = 25) : number[] {

    let count : number = 0;
    let result : number[] = [];

    function combineUtil(start : number = 1, combination : number[] = []) {

        if (combination.length === amount) {
            if(++count === num) result = combination;
            return;
        }

        for (let i = start; i <= overall; i++) {
            combination.push(i);
            combineUtil(i + 1, combination);
            if(result.length > 0) return;
            combination.pop();
        }

    }

    combineUtil();

    return result;

}

async function numeracoesDoResultado() {

    const result : Record<number, number> = {};

    forEach(resultados, (v, k) => {
        result[k] = numberOfCombination(v.map(i => parseInt(i)))
    });

    await writeFile('resultados_numbers_1_2968.json', JSON.stringify(result, undefined, 2));

}

async function diferenca() {
    const result = keysMap(numeros, (v, k) => v - (numeros?.[(parseInt(k)-1).toString() as keyof typeof numeros] || v));;
    await writeFile('resultados_numbers_diference_1_2968.json', JSON.stringify(result, undefined, 2));
}

async function diferencaPos() {
    const result = keysMap(numeros, (v, k) => v - (numeros?.[(parseInt(k)+1).toString() as keyof typeof numeros] || v));;
    await writeFile('resultados_numbers_diferencePos_1_2968.json', JSON.stringify(result, undefined, 2));
}

function repeats() {
    return filter(diff, (v, k) => (some({...diff, [k]: 0}, n => n === v)));
}

function mean() {
    return reduce(diff, (p, c) => p + c);
}

function cmd() {

    const args = process.argv;
    const cnum = parseInt(args[2]);

    if(!isNaN(cnum) && cnum > 0) {
        console.log(combinationOfNumber(cnum).join('-'));
        return;
    }

    const read = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    read.question('\n ESCOLHA:\n - Digitar o número da combinação\n - Digitar os números do jogo separados por hífen\n - Digitar \'exit\' para encerrar\n => ', x => {

        if(/^(\d{1,2}-){14}\d{1,2}$/.test(x)) console.log(' Combinação: ' + numberOfCombination(x.split('-').map(n => parseInt(n))));
        else if(!isNaN(parseInt(x))) console.log(' Número: ' + combinationOfNumber(parseInt(x)).join('-'));

        read.close();

        if(x !== 'exit') cmd();

    });

}

// console.log(numberOfCombination([16,7,17,13,8,10,9,15,24,21,6,22,4,3,11]));

// numeracoesDoResultado().finally(() => console.log('finally'));

// diferenca().finally(() => console.log('finally'));

// diferencaPos().finally(() => console.log('finally'));

// console.log(repeats());  // result 0

// console.log(mean());  // result 167872

// console.log(combinationOfNumber(2906642));

// console.log(combinationOfNumber(2488332+167872));  // [ 2,  4,  8,  9, 10, 12, 14, 15, 17, 19, 20, 21, 23, 24, 25 ]
// console.log(combinationOfNumber(2488332-167872));  // [ 2,  3,  5,  6,  9, 10, 11, 13, 14, 16, 18, 20, 23, 24, 25 ]

cmd();
