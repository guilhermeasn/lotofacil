import { useState } from "react";
import { Container } from "react-bootstrap";
import BetInput from "./components/BetInput";
import BetQuantity from "./components/BetQuantity";
import Header from "./components/Header";
import Totalization from "./components/Totalization";
import { raffles } from "./helpers/fetch";

/**
 * ### Dados da Aposta
 * 
 * - **balls**: numeros escolhidos da aposta
 * - **quantity**: quantidade de jogos contidos na mesma aposta
 * - **valid**: aposta valida
 */
export type Bet = {
    balls : number[];
    quantity : number;
    valid : boolean;
}

const betEmpty : Bet = {
    balls: [],
    quantity : 0,
    valid: false
}

const price : number = 3;

raffles().then(console.dir);

export default function App() {

    const [ bets, setBets ] = useState<Bet[]>([ betEmpty ]);

    const betQuantity = (value : number) : void => {
        const newBets : Bet[] = [];
        for(let c = 0; c < value; c++) newBets.push(bets?.[c] ?? betEmpty);
        setBets(newBets);
    }

    const betUpdate = (index : number, bet : Bet) : void => {
        const newBets : Bet[] = [ ...bets ];
        newBets[index] = bet;
        setBets(newBets);
    }

    const betTotal : number = bets.reduce((p, c) => p + c.quantity, 0);

    return <>

       <Header />

        <Container as='main' className="py-3">

            <BetQuantity
                quantity={ bets.length }
                onChange={ betQuantity }
            />
            
            { bets.map((bet, index) => (
                <BetInput
                    id={ index + 1 }
                    key={ index }
                    price={ price }
                    bet={ bet }
                    onChange={ bet => betUpdate(index, bet) }
                />
            )) }

            <Totalization price={ price } quantity={ betTotal } />

        </Container>

    </>;

}
