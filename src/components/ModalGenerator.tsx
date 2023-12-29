import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Raffles } from "../helpers/fetch";
import { surprise } from "../helpers/math";

import Range from "./Range";

export type ModalGeneratorProps = {
    show   : boolean;
    data   : Raffles;
    onHide : () => void;
    onMake : (bets : number[][]) => void;
}

export default function ModalGenerator({ show, data, onHide, onMake } : ModalGeneratorProps) {

    const [ balls, setBalls ] = useState<number>(15);
    const [ wait, setWait ] = useState<boolean>(false);
    const [ randoms, setRandoms ] = useState<number>(10);

    const getRandoms = () => {

        setWait(true);

        setTimeout(() => {

            const bets : number[][] = [];

            while(bets.length < randoms) bets.push(surprise(balls, 25));

            onMake(bets);

            setTimeout(() => {
                onHide();
                setWait(false);
            }, 1000);
            
        }, 1000);

    }

    return (

        <Modal show={ show } onHide={ wait ? undefined : onHide }>

            <Modal.Header className="alert alert-success rounded-bottom-0 user-select-none" closeButton={ !wait }>
                <Modal.Title>Gerador de Apostas</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Range
                    className='mb-3'
                    label="Quantidade de Números"
                    min={ 15 }
                    max={ 20 }
                    num={ balls }
                    onChange={ setBalls }
                />

                <Range
                    label="Quantidade de Apostas"
                    min={ 1 }
                    max={ 100 }
                    num={ randoms }
                    onChange={ setRandoms }
                />

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide } disabled={ wait }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ getRandoms } disabled={ wait }>
                    { wait ? <Spinner size='sm' /> : 'Gerar' }
                </Button>

            </Modal.Footer>

        </Modal>

    );

}
