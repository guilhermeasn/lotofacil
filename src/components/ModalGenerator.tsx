import { useCallback, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Raffles } from "../helpers/fetch";

import trigger from "../worker";
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

    const getRandoms = useCallback(() => {

        setWait(true);

        trigger('surprises', randoms, balls, 25).then(bets => {

            if(show) onMake(bets);

            onHide();
            setWait(false);
            
        });

    }, [randoms, balls, show, onMake, onHide]);

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
                    disabled={ wait }
                />

                <Range
                    label="Quantidade de Apostas"
                    min={ 1 }
                    max={ 100 }
                    num={ randoms }
                    onChange={ setRandoms }
                    disabled={ wait }
                />

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ getRandoms } disabled={ wait }>
                    { wait ? <Spinner size='sm' /> : 'Gerar' }
                </Button>

            </Modal.Footer>

        </Modal>

    );

}
