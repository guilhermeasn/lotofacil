import { useState } from "react";
import { Button, FormCheck, FormGroup, FormLabel, FormSelect, Modal, Spinner, Tab, Tabs } from "react-bootstrap";
import { surprise } from "../helpers/math";
import Range from "./Range";

export type ModalGeneratorProps = {
    show   : boolean;
    onHide : () => void;
    onMake : (bets : number[][]) => void;
}

export default function ModalGenerator({ show, onHide, onMake } : ModalGeneratorProps) {

    const [ balls, setBalls ] = useState<number>(15);
    const [ tab, setTab ] = useState<string>('random');
    const [ wait, setWait ] = useState<boolean>(false);

    const [ randoms, setRandoms ] = useState<number>(10);
    const [ smarts, setSmarts ] = useState<number>(10);

    const [ hits, setHits ] = useState<number[]>([ 13, 14 ]);

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

    const getSmarts = () => {

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

                <Tabs activeKey={ tab } onSelect={ key => key === null ? undefined : setTab(key) }>

                    <Tab className="p-4" eventKey="random" title="Aleatório">
                        <Range
                            label="Quantidade de Apostas Aleatórias"
                            min={ 1 }
                            max={ 100 }
                            num={ randoms }
                            onChange={ setRandoms }
                        />
                    </Tab>

                    <Tab className="p-4" eventKey="smart" title="Inteligente">

                        <Range
                            label="Quantidade Máxima de Apostas"
                            min={ 1 }
                            max={ 100 }
                            num={ smarts }
                            onChange={ setSmarts }
                        />

                        <FormGroup className="my-3">

                            <FormLabel>Obteve mais acertos com:</FormLabel>

                            <div className="text-center">
                                { Array(5).fill(11).map((v, k) => (
                                    <FormCheck
                                        key={ k }
                                        label={ k + v }
                                        type="checkbox"
                                        checked={ hits.some(hit => hit === k + v) }
                                        onChange={ () => setHits(hits => hits.some(hit => hit === k + v) ? hits.filter(hit => hit !== k + v) : [ ...hits, k + v ]) }
                                        inline
                                    />
                                )) }
                            </div>

                        </FormGroup>

                        <FormGroup>

                            <FormLabel>Dos sorteios:</FormLabel>

                            <Select />

                        </FormGroup>

                    </Tab>

                    <Tab className="p-4" eventKey="statistic" title="Estatístico">

                        <FormGroup className="mt-3">

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

                            <Select />

                        </FormGroup>

                    </Tab>

                </Tabs>

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ tab === 'random' ? getRandoms : getSmarts } disabled={ wait || hits.length < 1 }>
                    { wait ? <Spinner size='sm' /> : 'Gerar' }
                </Button>

            </Modal.Footer>

        </Modal>

    );

}

function Select() {
    return (
        <FormSelect>
            <option value="30">últimos trinta sorteios</option>
            <option value="24">últimos vinte e quatro sorteios</option>
            <option value="18">últimos dezoito sorteios</option>
            <option value="12">últimos doze sorteios</option>
            <option value="6">últimos seis sorteios</option>
            <option value="3">últimos três sorteios</option>
            <option value="1">último sorteio</option>
            <option value="0">todos os sorteios</option>
        </FormSelect>
    )
}