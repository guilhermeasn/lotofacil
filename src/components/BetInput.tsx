import { useMask } from "mask-hooks";
import { ReactNode, useEffect, useState } from "react";
import { Badge, Form, InputGroup } from "react-bootstrap";
import { Bet } from "../App";

import {
    betQuantity,
    mean,
    numberOfCombination,
    pairs, 
    primes,
    sum
} from "../helpers/math";

export type BetInputProps = {
    index : number;
    bet : Bet;
    price : number;
    onChange : (index : number, bet : Bet) => void;
}

type Analytic = {
    relative : number;
    sum      : number;
    mean     : number;
    pairs    : number;
    primes   : number;
}

const maskDefaut : string = Array.from({ length: 20 }, () => '[1-25]').join('-');

export default function BetInput({ index, bet, price, onChange } : BetInputProps) {

    const mask = useMask({ masks: [ maskDefaut ] });
    const [ value, setValue ] = useState<string>(bet.balls.join('-'));
    const [ analytic, setAnalytic ] = useState<Analytic | null>();

    useEffect(() => {

        const balls : number[] = value.split('-').filter(v => v.length === 2).map(v => parseInt(v));
        const valid : boolean = value.replace(/-$/, '').length === balls.length * 3 - 1 && balls.length >= 15 && !balls.some(v => v < 1 || v > 25) && (new Set(balls)).size === balls.length;
        onChange(index, { valid, balls, quantity: betQuantity(balls.length) });

    }, [ value ]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => setAnalytic(bet.valid ? {

        relative : numberOfCombination(bet.balls, 25),
        sum      : sum(bet.balls),
        mean     : mean(bet.balls),
        pairs    : pairs(bet.balls),
        primes   : primes(bet.balls)

    } : bet.balls.length ? null : undefined), [ bet, price ]);

    return (

        <div className="mb-3">

            <InputGroup className="mb-0">

                <InputGroup.Text className="bg-dark text-light rounded-bottom-none">
                    { index + 1 }
                </InputGroup.Text>

                <Form.Control
                    value={ value }
                    className={ 'rounded-bottom-none ' + (value ? bet.valid ? 'input-success' : 'input-error' : '') }
                    onChange={ input => setValue(mask(input.currentTarget.value)) }
                />

            </InputGroup>

            <div className='m-0 p-3 bg-light-gray rounded-bottom border'>

                { !analytic && (
                    <div className={ analytic === null ? 'alert alert-danger w-100 p-2' : 'alert alert-warning w-100 p-2' }>
                        { analytic === null ? 'Aposta Inválida!' : 'Insira a sua aposta!' }
                    </div>
                ) }

                <div className='h5'>

                    <Pill>{ bet.balls.length }&nbsp;números</Pill>
                    <Pill>{ bet.quantity }&nbsp;{ bet.quantity === 1 ? 'jogo' : 'jogos' }</Pill>
                    <Pill>{ (bet.quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</Pill>

                    { !!analytic && (

                        <>
                        
                            <Pill>Número Relativo: { analytic.relative }</Pill>
                            <Pill>Somatório: { analytic.sum }</Pill>
                            <Pill>Média: { analytic.mean }</Pill>
                            <Pill>Números Pares: { analytic.pairs }</Pill>
                            <Pill>Números primos: { analytic.primes }</Pill>
                        
                        </>

                    ) }

                </div>

            </div>

        </div>

    )
}

function Pill({ children } : { children : ReactNode }) {
    return (
        <Badge className="m-1" bg='secondary' pill>
            { children }
        </Badge>
    );
}
