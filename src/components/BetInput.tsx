import { useMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Bet } from "../App";
import { betQuantity } from "../helpers/math";

export type BetInputProps = {
    index : number;
    bet : Bet;
    price : number;
    onChange : (index : number, bet : Bet) => void;
}

const maskDefaut : string = Array.from({ length: 20 }, () => '[1-25]').join('-');

export default function BetInput({ index, bet, price, onChange } : BetInputProps) {

    const mask = useMask({ masks: [ maskDefaut ] });
    const [ value, setValue ] = useState<string>(bet.balls.join('-'));

    useEffect(() => {

        const balls : number[] = value.split('-').filter(v => v.length === 2).map(v => parseInt(v));
        const valid : boolean = value.replace(/-$/, '').length === balls.length * 3 - 1 && balls.length >= 15 && !balls.some(v => v < 1 || v > 25) && (new Set(balls)).size === balls.length;
        onChange(index, { valid, balls, hits: [], quantity: betQuantity(balls.length) });

    }, [ value ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <InputGroup className="mb-3">

            <InputGroup.Text className="d-none d-md-block bg-dark text-light">
                { index + 1 }
            </InputGroup.Text>

            <Form.Control
                value={ value }
                className={ value ? bet.valid ? 'input-success' : 'input-error' : undefined }
                onChange={ input => setValue(mask(input.currentTarget.value)) }
            />

            <InputGroup.Text className="d-none d-sm-block">
                { bet.balls.length } números
            </InputGroup.Text>

            <InputGroup.Text className="d-none d-md-block">
                { (bet.valid ? bet.quantity * price : 0 ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </InputGroup.Text>

        </InputGroup>

    )
}
