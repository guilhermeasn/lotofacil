import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
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
    const [ analytics, setAnalytics ] = useState<Array<Analytic | null>>([]);

    useEffect(() => {
        if(data) setAnalytics(bets.map<Analytic | null>(bet => bet.valid ? ({
            relative : numberOfCombination(bet.balls, 25),
            sum      : sum(bet.balls),
            mean     : mean(bet.balls),
            pairs    : pairs(bet.balls),
            primes   : primes(bet.balls),
            hits     : matches(bet.balls, map(data, r => r))
        }) : null)); else raffles().then(setData);
    }, [ data, bets ]);

    return !data ? <Loading /> : (

        <Table variant="warning" striped hover responsive bordered>

            <thead>
                <tr className="text-center">
                    <td>#</td>
                    <th>Número&nbsp;Relativo</th>
                    <th>Somatório</th>
                    <th>Média</th>
                    <th>Números&nbsp;Pares</th>
                    <th>Números&nbsp;Primos</th>
                    { Array(11).fill(5).map((v, k) => <th key={ k }>{ k + v }&nbsp;Acertos</th>) }
                </tr>
            </thead>

            <tbody>
                { analytics.map((analytic, index) => (
                    <tr key={ index }>
                        <th>{ index + 1 }</th>

                        { analytic === null ? <td className="text-danger" colSpan={ 16 }>Aposta inválida! Verifique!</td> : <>
                        
                            <td>{ analytic.relative.toLocaleString('pt-BR') }</td>
                            <td>{ analytic.sum }</td>
                            <td>{ analytic.mean }</td>
                            <td>{ analytic.pairs }</td>
                            <td>{ analytic.primes }</td>
                            { Array(11).fill(5).map((v, k) => <td key={ k }>{ analytic.hits?.[k + v] ?? 0 }</td>) }

                        </> }

                    </tr>
                )) }
            </tbody>

            <tfoot>
                <tr>
                    <th className="text-center" colSpan={ 6 }>TOTAL</th>
                    { Array(11).fill(5).map((v, k) => <th key={ k }>{ analytics.reduce((sum, analytic) => sum + (analytic?.hits?.[k + v] ?? 0), 0) }</th>) }
                </tr>
            </tfoot>
            
        </Table>

    );

}