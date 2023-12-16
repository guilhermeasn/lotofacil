import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import { match } from "../helpers/math";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[]
};

export default function Proofing({ bets } : ProofingProps) {

    const [ data, setData ] = useState<Raffles>(null);
    useEffect(() => { if(!data) raffles().then(setData); }, [ data ]);

    return !data ? <Loading /> : (

        <Table variant="warning" responsive striped bordered hover>

            <thead>
                <tr>
                    <th>Sorteios&nbsp;=&gt;</th>
                    { map(data, (raffle, index) => (
                        <th key={ index } title={ raffle.sort((a, b) => a - b).join('-') }>
                            { index }
                        </th>
                    )) }
                </tr>
            </thead>

            <tbody>
                { bets.map((bet, key) => (
                    <tr key={ key }>
                        <th title={ bet.balls.sort((a, b) => a - b).join('-') }>
                            Aposta&nbsp;{ key + 1 }
                        </th>
                        { bet.valid ? <Column balls={ bet.balls } raffles={ data } /> : (
                            <td className="ps-3 text-danger" colSpan={ Object.keys(data).length - 1 }>
                                Aposta inválida! Verifique!
                            </td>
                        ) }
                    </tr>
                )) }
            </tbody>

        </Table>

    );

}

type ColumnProps = {
    balls : number[];
    raffles : NonNullable<Raffles>;
}

function Column({ balls, raffles } : ColumnProps) {

    return (
        <>
            { map(raffles, (raffle, index) => (
                <td key={ index }>
                    { match(balls, raffle) }
                </td>
            )) }
        </>
    );

}