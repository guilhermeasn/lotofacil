import { useMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Bet } from "../App";
import { bets } from "../helpers/math";

export type BetInputProps = {
    bet : Bet;
    price : number;
    onChange : (bet : Bet) => void;
}

const maskDefaut : string = Array.from({ length: 20 }, () => '[1-25]').join('-');

export default function BetInput({ bet, price, onChange } : BetInputProps) {

    const mask = useMask({ masks: [ maskDefaut ] });
    const [ value, setValue ] = useState<string>(bet.balls.join('-'));

    useEffect(() => {

        const balls : number[] = value.split('-').filter(v => v.length === 2).map(v => parseInt(v));
        const valid : boolean = value.replace(/-$/, '').length === balls.length * 3 - 1 && balls.length >= 15 && !balls.some(v => v < 1 || v > 25) && (new Set(balls)).size === balls.length;
        onChange({ valid, balls, price : valid ? bets(balls.length) * price : 0 });

    }, [ value ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <InputGroup className="mb-3">

            <Form.Control
                value={ value }
                className={ value ? bet.valid ? 'input-success' : 'input-error' : undefined }
                onChange={ input => setValue(mask(input.currentTarget.value)) }
            />

            <InputGroup.Text className="d-none d-sm-block">
                { bet.balls.length } números
            </InputGroup.Text>

            <InputGroup.Text className="d-none d-md-block">
                { bet.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </InputGroup.Text>

        </InputGroup>

    )
}
