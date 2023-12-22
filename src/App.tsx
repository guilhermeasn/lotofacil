import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ModalBet from "./components/ModalBet";
import ModalRaffle from "./components/ModalRaffle";
import ModalStatistic from "./components/ModalStatistic";
import Proofing from "./components/Proofing";
import Totalization from "./components/Totalization";

import Bet from "./components/Bet";
import ModalDetail from "./components/ModalDetail";
import { Raffles, raffles, restore, save } from "./helpers/fetch";
import { betQuantity } from "./helpers/math";

const price : number = 3;

export default function App() {

    const [ data, setData ] = useState<Raffles>(null);
    useEffect(() => { if(!data) raffles().then(setData); });  // eslint-disable-line react-hooks/exhaustive-deps

    const [ bets, setBets ] = useState<number[][]>(restore() ?? []);
    useEffect(() => { save(bets); }, [ bets ]);

    const [ modal, setModal ] = useState<'bet' | 'raffle' | 'statistic' | 'detail' | null>(null);

    const [ detail, setDetail ] = useState<number | null>(null);
    useEffect(() => setModal(detail === null ? null : 'detail') , [ detail ]);

    const [ update, setUpdate ] = useState<number | null>(null);
    useEffect(() => setModal(update === null ? null : 'bet'), [ update ]);

    const betAdd = (bet : number[]) => setBets(bets => [ ...bets, bet ]);
    const betDel = (index : number) => setBets(bets => bets.filter((_, key) => key !== index));
    const betUpdate = (index : number, bet : number[]) => setBets(bets => bets.map((old, key) => key === index ? bet : old));

    return <>

        <Header
            onRaffle={ () => setModal('raffle') }
            onStatistic={ () => setModal('statistic') }
        />

        <Container as='main' className="py-3">

            <section className="my-3 text-center">

                { bets.map((bet, index) => (
                    <Bet
                        key={ index }
                        index={ index }
                        bet={ bet }
                        onDetail={ () => setDetail(index) }
                        onUpdate={ () => setUpdate(index) }
                        onDelete={ () => betDel(index) }
                    />
                )) }

                <Button variant="primary" size="lg" onClick={ () => setModal('bet') }>
                    Inserir Aposta
                </Button>

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
        />

        <ModalStatistic
            show={ modal === 'statistic' }
            onHide={ () => setModal(null) }
        />

        <ModalDetail
            bet={ detail === null ? undefined : bets[detail] }
            price={ price }
            show={ modal === 'detail' }
            onHide={ () => setDetail(null) }
        />

    </>;

}
