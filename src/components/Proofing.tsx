import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[];
    onChange : (index : number, changes : Partial<Bet>) => void;
};

export default function Proofing({ bets, onChange } : ProofingProps) {

    const [ data, setData ] = useState<Raffles>(null);
    useEffect(() => { data || raffles().then(setData); }, [ data ]);

    // useEffect(() => {

    //     let matrix : Matrix | undefined;
    //     let valids : number[][] = bets.filter(bet => bet.valid).map(bet => bet.balls);

    //     if(data && valids.length) {
    //         matrix = Array(valids.length);
    //         valids.forEach(bet => matrix?.push(map(data, (raffle) => match(bet, raffle))));
    //     }

    //     onLoad(matrix);

    // }, [ data, bets ]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        { bet.valid ? (
                            <></>
                        ) : (
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
