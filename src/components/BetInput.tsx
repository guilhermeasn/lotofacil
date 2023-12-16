/* eslint-disable react-hooks/exhaustive-deps */

import { useMask } from "mask-hooks";
import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Bet } from "../App";
import { bets } from "../helpers/math";

export type BetInputProps = {
    bet : Bet;
    price : number;
    onChange : (changes : Partial<Bet>) => void;
}

export default function BetInput({ bet, price, onChange } : BetInputProps) {

    const mask = useMask({ masks: [ Array.from({ length: 20 }, () => '[1-25]').join('-') ] });

    useEffect(() => {

        const pieces : number[] = bet.value.split('-').map(v => parseInt(v));

        const valid : boolean = (
            bet.value.length === bet.balls * 3 - 1 &&
            pieces.length === bet.balls &&
            !pieces.some(p => p < 1 || p > 25) &&
            (new Set(pieces)).size === pieces.length
        );

        onChange({ valid, price : valid ? bets(bet.balls) * price : 0 });

    }, [ bet.value, bet.balls ]);

    return (

        <InputGroup className="mb-3">

            <Form.Control
                value={ bet.value }
                className={ bet.value ? bet.valid ? 'input-success' : 'input-error' : undefined }
                onChange={ input => onChange({ value: mask(input.currentTarget.value) }) }
            />

            <InputGroup.Text>
                { bet.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </InputGroup.Text>

        </InputGroup>

    )
}
