import { useState } from "react";
import { Container } from "react-bootstrap";

import BetInput from "./components/BetInput";
import BetQuantity from "./components/BetQuantity";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Proofing from "./components/Proofing";
import Totalization from "./components/Totalization";

/**
 * ### Dados da Aposta
 * 
 * - **balls**: numeros escolhidos da aposta
 * - **quantity**: quantidade de jogos contidos na mesma aposta
 * - **valid**: aposta valida
 */
export type Bet = {
    balls    : number[];
    quantity : number;
    valid    : boolean;
    hits     : number[]
}

const betEmpty : Bet = {
    balls:    [],
    quantity: 0,
    valid:    false,
    hits:     []
}

const price : number = 3;

export default function App() {

    const [ bets, setBets ] = useState<Bet[]>([ betEmpty ]);

    const betQuantity = (value : number) : void => {
        const newBets : Bet[] = [];
        for(let c = 0; c < value; c++) newBets.push(bets?.[c] ?? betEmpty);
        setBets(newBets);
    }

    const betUpdate = (index : number, changes : Partial<Bet>) : void => {
        const newBets : Bet[] = [ ...bets ];
        newBets[index] = { ...newBets[index], ...changes };
        setBets(newBets);
    }

    const betTotal : number = bets.reduce((p, c) => p + (c.valid ? c.quantity : 0), 0);
    console.log(bets);

    return <>

       <Header />

        <Container as='main' className="py-3">

            <section>

                <BetQuantity
                    quantity={ bets.length }
                    onChange={ betQuantity }
                />
                
                { bets.map((bet, index) => (
                    <BetInput
                        index={ index }
                        key={ index }
                        price={ price }
                        bet={ bet }
                        onChange={ betUpdate }
                    />
                )) }

            </section>

            <section className="my-4 py-4 border-top border-bottom">

                <Proofing
                    bets={ bets }
                    onChange={ betUpdate }
                />

            </section>

            <section>

            <Totalization
                price={ price }
                quantity={ betTotal }
            />

            </section>

        </Container>

        <Footer />

    </>;

}
