import map from "object-as-array/map";

import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { betQuantity, mean, pairs, primes, sum } from "../helpers/math";

import trigger from "../helpers/trigger";
import Loading from "./Loading";

export type ModalDetailProps = {
    bet ?: number[];
    price : number;
    show : boolean;
    onHide : () => void;
}

type Analytic = Record<(
    'length' | 'quantity' | 'price' | 'relative' |
    'sum'    | 'mean'     | 'pairs' | 'primes'
), number>;

const description : Record<keyof Analytic, string> = {
    length   : 'Quantidade de números',
    quantity : 'Quantidade de apostas',
    price    : 'Valor',
    relative : 'Número relativo',
    sum      : 'Somatório',
    mean     : 'Média numérica',
    pairs    : 'Números pares',
    primes   : 'Números primos'
}

export default function ModalDetail({ bet, price, show, onHide } : ModalDetailProps) {

    const [ analytic, setAnalytic ] = useState<Analytic | null>(null);
    const [ relative, setRelative ] = useState<number | null>(null);

    useEffect(() => {

        if(!show || !bet) {
            setAnalytic(null);
            setRelative(null);
            return;
        }

        trigger('numberOfCombination', bet).then(setRelative);

        setAnalytic({
            length   : bet.length,
            quantity : betQuantity(bet.length),
            price    : betQuantity(bet.length) * price,
            relative : 0,
            sum      : sum(bet),
            mean     : mean(bet),
            pairs    : pairs(bet),
            primes   : primes(bet)
        });

    }, [bet, price, show]);

    return (
        <Modal show={ show } onHide={ onHide } centered>
            
            <Modal.Header className="alert alert-warning rounded-bottom-0 user-select-none" closeButton>
                <Modal.Title>Detalhes</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { analytic && bet ? (

                    <ListGroup variant="flush">

                        <ListGroup.Item className="text-center small">
                            <strong>
                                { bet.join('-') }
                            </strong>
                        </ListGroup.Item>

                        { map(analytic, (num, key) => (

                            <ListGroup.Item className="d-flex px-4 justify-content-between" key={ key }>
                                <span>{ description[key] }:&nbsp;</span>
                                <span>{ key === 'relative' ? (relative?.toLocaleString('pt-br') ?? '...') : num.toLocaleString('pt-br', key === 'price' ? { style: 'currency', currency: 'BRL' } : undefined) }</span>
                            </ListGroup.Item>

                        )) }

                    </ListGroup>

                ) : <Loading /> }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ onHide }>
                    Fechar
                </Button>
            </Modal.Footer>
            
        </Modal>
    );

}
