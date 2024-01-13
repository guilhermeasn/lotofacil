import download from 'downloadjs';

import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Raffles, raffles, restore, save } from "./helpers/fetch";
import { betQuantity, replicates } from "./helpers/math";

import Bet from "./components/Bet";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ModalBet from "./components/ModalBet";
import ModalDetail from "./components/ModalDetail";
import ModalGenerator from './components/ModalGenerator';
import ModalRaffle from "./components/ModalRaffle";
import ModalStatistic from "./components/ModalStatistic";
import Proofing from "./components/Proofing";
import Totalization from "./components/Totalization";

const price : number = 3;

export default function App() {

    const [ data, setData ] = useState<Raffles>(null);
    const load = () => { if(!data) raffles().then(setData).finally(() => setTimeout(() => data || load, 3000)); };
    useEffect(load, [data, load]);

    const [ bets, setBets ] = useState<number[][]>(restore() ?? []);
    useEffect(() => { save(bets); }, [ bets ]);

    const [ modal, setModal ] = useState<'bet' | 'raffle' | 'statistic' | 'detail' | 'generator' | null>(null);

    const [ detail, setDetail ] = useState<number[] | null>(null);
    useEffect(() => setModal(detail === null ? null : 'detail') , [ detail ]);

    const [ update, setUpdate ] = useState<number | null>(null);
    useEffect(() => setModal(update === null ? null : 'bet'), [ update ]);

    const [ duplicates, setDuplicates ] = useState<number[]>([]);
    useEffect(() => setDuplicates(replicates(bets)), [ bets ]);

    const betAdd = (...bets : number[][]) => setBets(old => [ ...old, ...bets ]);
    const betDel = (index : number) => setBets(bets => bets.filter((_, key) => key !== index));
    const betUpdate = (index : number, bet : number[]) => setBets(bets => bets.map((old, key) => key === index ? bet : old));

    const betsText = useCallback(() : string[] => bets.map((bet, index) => `Aposta ${index + 1} => ${bet.length} numeros: ${bet.map(num => (num < 10 ? '0' : '') + num.toString()).join('-')} \n`), [ bets ]);

    return <>

        <Header
            onRaffle={ () => setModal('raffle') }
            onStatistic={ () => setModal('statistic') }
        />

        <Container as='main' className="py-3">

            <section className="my-3 text-center">

                { !bets.length && (
                    <Alert variant="warning" className="text-start">
                        Nenhuma aposta salva!
                    </Alert>
                ) }

                { duplicates.length > 0 && (
                    <Alert variant="danger" className="text-start">
                        Foram encontradas apostas repetidas!
                    </Alert>
                ) }

                <Row className="mb-3">

                    { bets.map((bet, index) => (
                        <Col key={ index } xs={ 12 } xl={ bets.length > 99 ? 3 : (bets.length > 9 ? 6 : 12) } >
                            <Bet
                                cod={ (index + 1).toString() }
                                bet={ bet }
                                warn={ duplicates.some(num => num === index) }
                                onDetail={ () => setDetail(bet) }
                                onUpdate={ () => setUpdate(index) }
                                onDelete={ () => betDel(index) }
                            />
                        </Col>
                    )) }

                </Row>

                <Button variant="primary" className="m-1 btn-size-1" onClick={ () => setModal('bet') }>
                    Inserir Aposta
                </Button>

                <Button variant="success" className="m-1 btn-size-1" onClick={ () => setModal('generator') }>
                    Gerar Apostas
                </Button>

                <Button variant="warning" className="m-1 btn-size-1" disabled={ bets.length === 0 } onClick={ () => download(new Blob(betsText()), 'lotofacil-bets.txt', 'text/plain') }>
                    Download
                </Button>

                { bets.length > 9 && (
                    <p>
                        <OverlayTrigger placement="bottom" overlay={ <Tooltip>Duplo click para deletar todas as apostas</Tooltip> }>
                            <Button variant="outline-danger" className="m-1 btn-size-1" onDoubleClick={ () => setBets([]) }>
                                Deletar Apostas
                            </Button>
                        </OverlayTrigger>
                    </p>
                ) }

            </section>

            <section className="my-4 py-4 border-top border-bottom">

                <Proofing
                    data={ data }
                    bets={ bets }
                />

            </section>

            <section>

                <Totalization
                    price={ price }
                    quantity={ bets.reduce((total, bet) => total + betQuantity(bet.length), 0) }
                />

            </section>

        </Container>

        <Footer />

        <ModalBet
            bet={ update === null ? [] : bets[update] }
            show={ modal === 'bet' }
            onHide={ update === null ? () => setModal(null) : () => setUpdate(null) }
            onSave={ update === null ? betAdd : bet => betUpdate(update, bet) }
        />

        <ModalRaffle
            data={ data }
            show={ modal === 'raffle' }
            onHide={ () => setModal(null) }
            onDetail={ setDetail }
        />

        <ModalStatistic
            show={ modal === 'statistic' }
            onHide={ () => setModal(null) }
        />

        <ModalDetail
            bet={ detail === null ? undefined : detail }
            price={ price }
            show={ modal === 'detail' }
            onHide={ () => setDetail(null) }
        />

        <ModalGenerator
            data={ data }
            show={ modal === 'generator' }
            onHide={ () => setModal(null) }
            onMake={ bets => betAdd(...bets) }
        />

    </>;

}
