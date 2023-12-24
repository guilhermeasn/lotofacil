import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { betQuantity, mean, numberOfCombination, pairs, primes, sum } from "../helpers/math";
import Loading from "./Loading";

export type ModalDetailProps = {
    bet ?: number[];
    price : number;
    show : boolean;
    onHide : () => void;
}

type Analytic = {
    length   : number;
    quantity : number;
    price    : number;
    relative : number;
    sum      : number;
    mean     : number;
    pairs    : number;
    primes   : number;
}

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

    const [ analytic, setAnalytic ] = useState<Analytic | null>();

    useEffect(() => {

        setAnalytic(null);

        if(show && bet) numberOfCombination(bet).then(relative => {
            setAnalytic({
                length   : bet.length,
                quantity : betQuantity(bet.length),
                price    : betQuantity(bet.length) * price,
                relative : relative,
                sum      : sum(bet),
                mean     : mean(bet),
                pairs    : pairs(bet),
                primes   : primes(bet)
            })
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
                                <span>{ num.toLocaleString('pt-br', key === 'price' ? { style: 'currency', currency: 'BRL' } : undefined) }</span>
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
