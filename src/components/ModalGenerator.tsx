import { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { surprise } from "../helpers/math";
import Range from "./Range";

export type ModalGeneratorProps = {
    show   : boolean;
    onHide : () => void;
    onMake : (bets : number[][]) => void;
}

export default function ModalGenerator({ show, onHide, onMake } : ModalGeneratorProps) {

    const [ balls, setBalls ] = useState<number>(15);
    const [ tab, setTab ] = useState<'random' | 'smart'>('random');
    const [ randoms, setRandoms ] = useState<number>(1);

    const getRandoms = () => {
        const bets : number[][] = [];
        while(bets.length < randoms) bets.push(surprise(balls, 25));
        onMake(bets);
        onHide();
    }

    const getSmarts = () => {

    }

    return (

        <Modal show={ show } onHide={ onHide }>

            <Modal.Header className="alert alert-success rounded-bottom-0 user-select-none" closeButton>
                <Modal.Title>Gerador</Modal.Title>
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

                <Tabs activeKey={ tab } onSelect={ key => key === 'random' || key === 'smart' ? setTab(key) : null }>

                    <Tab className="p-4" eventKey="random" title="Modo Aleatório">
                        <Range
                            label="Quantidade de Apostas"
                            min={ 1 }
                            max={ 100 }
                            num={ randoms }
                            onChange={ setRandoms }
                        />
                    </Tab>

                    <Tab className="p-4" eventKey="smart" title="Modo Inteligente">
                        Tab content for Profile
                    </Tab>

                </Tabs>

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ tab === 'random' ? getRandoms : getSmarts }>
                    Gerar
                </Button>

            </Modal.Footer>

        </Modal>

    );

}
