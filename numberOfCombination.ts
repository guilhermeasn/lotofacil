import { writeFile } from 'fs/promises';
import forEach from 'object-as-array/forEach';
import resultados from './resultados_1_2968.json';

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

async function numeracoesDoResultado() {

    const result : Record<number, number> = {};

    forEach(resultados, (v, k) => {
        result[k] = numberOfCombination(v.map(i => parseInt(i)))
    });

    await writeFile('resultados_numbers_1_2968.json', JSON.stringify(result, undefined, 2));

}

numeracoesDoResultado().finally(() => console.log('finally'));

// console.log(numberOfCombination([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]));


