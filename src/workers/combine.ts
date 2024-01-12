function combine(amount : number, overall : number, onResult : (combination : number[]) => boolean) {

    let stop : boolean = false;

    function loop(start : number = 1, combination : number[] = []) {

        if(combination.length === amount) {
            stop = onResult([ ...combination ]);
            return;
        }
    
        for(let num : number = start; num <= overall; num++) {
            if(stop) break;
            combination.push(num);
            loop(num + 1, combination);
            combination.pop();
        }

    }

    loop();

}

function numberOfCombination(sequence : number[]) : number {

        let count : number = 0;
        let result : number = 0;

        combine(sequence.length, 25, combination => {

            ++count;

            if(combination.every(n => sequence.some(s => s === n))) {
                result = count;
                return true;
            }

            return false;

        });

        return result;

}

/* eslint-disable no-restricted-globals */

self.onmessage = ({ data }) => {
    console.log(data);
    if (data.cmd === "numberOfCombination") {
        const result = numberOfCombination(data.sequence);
        self.postMessage({ result });
    }
};

export { };

