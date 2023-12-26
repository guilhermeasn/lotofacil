import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Alert, Button, ListGroup, Modal, Tab, Tabs } from "react-bootstrap";
import { Statistic, statistic } from "../helpers/fetch";
import Loading from "./Loading";

export type ModalStatisticProps = {
    show : boolean;
    onHide : () => void;
}

const titles : Record<keyof Statistic, string> = {
    ones: 'Unidade',
    tens: 'Dezena',
    sums: 'Soma',
    mean: 'Média',
    pairs: 'Pares',
    primes: 'Primos',
    quantity: 'Quantidade',
    sequential: 'Sequêncial'
}

const description : Record<keyof Statistic, string> = {
    ones: 'Quantidade de números sorteados de acordo com o seu grupo de unidade.',
    tens: 'Quantidade de números sorteados de acordo com o seu grupo de dezena.',
    sums: 'Quantidade de sorteios de acordo com a soma de seus números.',
    mean: 'Quantidade de sorteios de acordo com a média arredondada de seus números.',
    pairs: 'Quantidade de sorteios de acordo com a quantidade de números pares.',
    primes: 'Quantidade de sorteios de acordo com a quantidade de números primos.',
    quantity: 'Quantidade de vezes que um número foi sorteado.',
    sequential: 'Quantidade de vezes que um número foi sorteado de acordo com a ordem de sorteio.'
}

export default function ModalStatistic({ show, onHide } : ModalStatisticProps) {

    const [ data, setData ] = useState<Statistic | null>(null);
    const load = () => { if(!data) statistic().then(setData).finally(() => setTimeout(() => data || load, 3000)); };
    useEffect(load, [data, load]);
    
    return (
        
        <Modal size="lg" show={ show } onHide={ onHide } centered>

            <Modal.Header className="alert alert-warning rounded-bottom-0 user-select-none" closeButton>
                <Modal.Title>Estatística</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {  data ? <Tabs>
                    { map(data, (v, k) => (

                        <Tab className="p-2" key={ k } eventKey={ k } title={ titles[k] }>

                            <Alert variant="secondary" className="lead my-3">{ description[k] }</Alert>

                            <ListGroup>
                                { map(v, (c, t) => (
                                    <ListGroup.Item className="d-flex justify-content-around" key={ t }>
                                        <strong>{ k==='sequential' ? parseInt(t) + 1 : t }</strong>
                                        <span>=&gt;</span>
                                        <span>{ k==='sequential' ? JSON.stringify(c, undefined, 2) : c.toLocaleString('pt-br')}</span>
                                    </ListGroup.Item>
                                )) }
                            </ListGroup>

                        </Tab>
                        
                    )) }
                </Tabs> : <Loading /> }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ onHide }>
                    Fechar
                </Button>
            </Modal.Footer>

      </Modal>

    );

}