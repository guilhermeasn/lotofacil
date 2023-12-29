import { useState } from "react";
import { Button, FormGroup, FormLabel, FormSelect, Modal, Spinner, Tab, Tabs } from "react-bootstrap";
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
    const [ tab, setTab ] = useState<string>('random');
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

                <Tabs activeKey={ tab } onSelect={ key => wait || key === null ? undefined : setTab(key) }>

                    <Tab className="p-4" eventKey="random" title="Aleatório">
                        <Range
                            label="Quantidade de Apostas"
                            min={ 1 }
                            max={ 100 }
                            num={ randoms }
                            onChange={ setRandoms }
                        />
                    </Tab>

                    <Tab className="p-4" eventKey="statistic" title="Estatístico">

                        <FormGroup>

                            <FormLabel>Estratégia:</FormLabel>

                            <FormSelect>
                                <option>Números que mais saíram</option>
                                <option>Números que menos saíram</option>
                                <option>Números mais atrasados</option>
                                <option>Todas as opções</option>
                            </FormSelect>

                        </FormGroup>

                        <FormGroup className="mt-3">

                            <FormLabel>Dos sorteios:</FormLabel>

                            <FormSelect>
                                <option value="0">todos os sorteios</option>
                                <option value="30">últimos trinta sorteios</option>
                                <option value="24">últimos vinte e quatro sorteios</option>
                                <option value="18">últimos dezoito sorteios</option>
                                <option value="12">últimos doze sorteios</option>
                                <option value="6">últimos seis sorteios</option>
                                <option value="3">últimos três sorteios</option>
                            </FormSelect>

                        </FormGroup>

                    </Tab>

                </Tabs>

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide } disabled={ wait }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ tab === 'random' ? getRandoms : undefined } disabled={ wait }>
                    { wait ? <Spinner size='sm' /> : 'Gerar' }
                </Button>

            </Modal.Footer>

        </Modal>

    );

}
