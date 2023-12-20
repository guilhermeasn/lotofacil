import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import { matches } from "../helpers/math";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[];
}

export default function Proofing({ bets } : ProofingProps) {

    const [ data, setData ] = useState<Raffles>(null);
    const [ hits, setHits ] = useState<Array<Record<number, number> | null>>([]);

    useEffect(() => {
        if(data) setHits(bets.map<Record<number, number> | null>(bet => bet.valid ? matches(bet.balls, map(data, r => r)) : null));
        else raffles().then(setData);
    }, [ data, bets ]);

    return !data ? <Loading /> : (

        <Table variant="warning" striped hover responsive bordered>

            <thead>
                <tr className="text-center">
                    <td>#</td>
                    { Array(11).fill(5).map((v, k) => <th key={ k }>{ k + v }&nbsp;Acertos</th>) }
                </tr>
            </thead>

            <tbody>
                { hits.map((hit, index) => (
                    <tr key={ index }>
                        
                        <th>{ index + 1 }</th>

                        { hit === null
                            ? <td className="text-danger" colSpan={ 18 }>Aposta inválida! Verifique!</td>
                            : Array(11).fill(5).map((v, k) => <td key={ k }>{ hits?.[index]?.[k + v]?.toString() ?? '0' }</td>)
                        }

                    </tr>
                )) }
            </tbody>

            <tfoot>
                <tr>
                    <th className="text-center" colSpan={ 8 }>TOTAL</th>
                    {/* { Array(11).fill(5).map((v, k) => <th key={ k }>{ analytics.reduce((sum, analytic) => sum + (analytic?.hits?.[k + v] ?? 0), 0) }</th>) } */}
                </tr>
            </tfoot>
            
        </Table>

    );

}