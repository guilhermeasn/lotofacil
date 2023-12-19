import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import { matches, mean, numberOfCombination, pairs, primes, sum } from "../helpers/math";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[]
}

type Analytic = {
    relative : number;
    sum      : number;
    mean     : number;
    pairs    : number;
    primes   : number;
    hits     : Record<number, number>
}

export default function Proofing({ bets } : ProofingProps) {

    const [ data, setData ] = useState<Raffles>(null);
    const [ analytic, setAnalytic ] = useState<Array<Analytic | null>>([]);

    useEffect(() => {
        if(data) setAnalytic(bets.map<Analytic | null>(bet => bet.valid ? ({
            relative : numberOfCombination(bet.balls, 25),
            sum      : sum(bet.balls),
            mean     : mean(bet.balls),
            pairs    : pairs(bet.balls),
            primes   : primes(bet.balls),
            hits     : matches(bet.balls, map(data, r => r))
        }) : null)); else raffles().then(setData);
    }, [ data, bets ]);


    console.log(analytic);

    return data ? <></> : <Loading />;

}