/* eslint-disable react-hooks/exhaustive-deps */

import { applyMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { Bet } from "../App";
import { bets } from "../helpers/math";

export type BetInputProps = {
    bet : Bet;
    price : number;
    onChange : (changes : Partial<Bet>) => void;
}

export default function BetInput({ bet, price, onChange } : BetInputProps) {

    const [ mask, setMask ] = useState<string>('');

    useEffect(() => setMask(Array.from({ length: bet.balls }, () => '[1-25]').join('-')), [ bet.balls ]);
    useEffect(() => onChange({ value: applyMask(bet.value, { masks: [ mask ] })}), [ mask ]);

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

    console.log(bets(bet.balls) * price);

    return (

        <InputGroup className="mb-3">

            <DropdownButton variant="dark" title={ bet.balls.toString() }>
                { Array.from({ length: 6 }, (_, k) => k + 15).map(n => (
                    <Dropdown.Item key={ n } onClick={ () => onChange({ balls: n }) }>{ `${n} números` }</Dropdown.Item>
                )) }
            </DropdownButton>

            <Form.Control
                value={ bet.value }
                className={ bet.value ? bet.valid ? 'input-success' : 'input-error' : undefined }
                onChange={ input => onChange({ value: applyMask(input.currentTarget.value, { masks: [ mask ] }) }) }
            />

            <InputGroup.Text className="d-none d-md-inline-block">
                { bet.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </InputGroup.Text>

        </InputGroup>

    )
}
