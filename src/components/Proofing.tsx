import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import { matches } from "../helpers/math";
import Loading from "./Loading";
import reduce from "object-as-array/reduce";

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

        <Table variant="dark" striped hover responsive>

            <thead>
                <tr className="text-center">
                    <th className="bg-light text-dark">Apostas</th>
                    { Array(11).fill(5).map((v, k) => <th className="bg-light text-dark" key={ k }>{ k + v }&nbsp;Acertos</th>) }
                </tr>
            </thead>

            <tbody>
                { hits.map((hit, index) => (
                    <tr key={ index }>
                        
                        <th>#{ index + 1 }</th>

                        { hit === null
                            ? <td className="text-danger" colSpan={ 18 }>Aposta inválida! Verifique!</td>
                            : Array(11).fill(5).map((v, k) => <td key={ k }>{ hits?.[index]?.[k + v]?.toLocaleString('pt-br') ?? '0' }</td>)
                        }

                    </tr>
                )) }
            </tbody>

            <tfoot>
                <tr>
                    <th className="bg-light text-dark">TOTAL</th>
                    { Array(11).fill(5).map((v, k) => <th className="bg-light text-dark" key={ k }>{ reduce(hits, (total, hit) => total + ((hit as Record<number, number> | null)?.[k + v] ?? 0) ,0).toLocaleString('pt-br') }</th>) }
                </tr>
            </tfoot>
            
        </Table>

    );

}