import { writeFileSync } from "fs";
import combine from "./combinar5";
import sorteios from "./sorteios.json";

const combinacoes = combine();

for(let combinacao in combinacoes) {

    const find : number[] = combinacao.split('-').map(n => parseInt(n));

    for(let sorteio in sorteios as Record<string, string[]>) {

        const nums : number[] = sorteios[sorteio as keyof typeof sorteios].map(n => parseInt(n));

        if(find.every(f => nums.some(n => n === f))) {
            console.log(`o sorteio ${sorteio} contém a combinação ${combinacao}`);
            combinacoes[combinacao as keyof typeof combinacoes]++;
        }
        
    }

    writeFileSync('combinacoes5.json', JSON.stringify(combinacoes, undefined, 2));

}
