import map from "object-as-array/map";
import { ReactNode, useEffect, useState } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles, raffles } from "../helpers/fetch";
import { match } from "../helpers/math";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[];
    onChange : (index : number, changes : Partial<Bet>) => void;
};

export default function Proofing({ bets, onChange } : ProofingProps) {

    const [ data, setData ] = useState<Raffles>(null);
    useEffect(() => { if(!data) raffles().then(setData) }, [ data ]);

    useEffect(() => {
        
        if(data && bets.some(bet => bet.valid && !bet.hits.length)) {
            bets.forEach((bet, index) => onChange(index, {
                hits: bet.valid ? map(data, (raffle) => match(bet.balls, raffle)) : []
            }));
        }

    }, [ data, bets ]); // eslint-disable-line react-hooks/exhaustive-deps

    return !data ? <Loading /> : (

        <Table variant="warning" responsive striped bordered hover>

            <thead>

                <tr>

                    <th>Sorteios&nbsp;=&gt;</th>

                    { map(data, (raffle, index) => (

                        <ThBet key={ index } balls={ raffle }>
                            { index }
                        </ThBet>

                    )) }

                </tr>

            </thead>

            <tbody>

                { bets.map((bet, key) => (

                    <tr key={ key }>

                        <ThBet balls={ bet.balls }>
                            Aposta&nbsp;{ key + 1 }
                        </ThBet>

                        { bet.valid ? bet.hits?.map((hit, key) => (
                            <td key={ key }>
                                { hit }
                            </td>
                        )) : (
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

type ThBetProps = {
    balls      : number[];
    children   : ReactNode;
    className ?: string;
}

function ThBet({ balls, children, className } : ThBetProps) {

    return (
        <OverlayTrigger overlay={ <Tooltip>{ balls.sort((a, b) => a - b).join('-') }</Tooltip> }>
            <th className={ className }>{ children }</th>
        </OverlayTrigger>
    );

}
