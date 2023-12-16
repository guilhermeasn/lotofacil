import { useState } from "react";
import { Container } from "react-bootstrap";
import BetInput from "./components/BetInput";
import BetQuantity from "./components/BetQuantity";
import Header from "./components/Header";

export type Bet = {
    value : string;
    balls : number;
    price : number;
    valid : boolean;
}

const betDefault : Bet = {
    value: '',
    balls: 15,
    price: 0,
    valid: false
}

export default function App() {

    const [ bets, setBets ] = useState<Bet[]>([ betDefault ]);

    const betQuantity = (value : number) => {
        const newBets : Bet[] = [];
        for(let c = 0; c < value; c++) newBets.push(bets?.[c] ?? betDefault);
        setBets(newBets);
    }

    const betUpdate = (index : number, changes : Partial<Bet>) => {
        const newBets : Bet[] = [ ...bets ];
        newBets[index] = { ...newBets[index], ...changes };
        setBets(newBets);
    }

    return <>

       <Header />

        <Container as='main' className="py-3">

            <BetQuantity
                quantity={ bets.length }
                onChange={ betQuantity }
            />
            
            { bets.map((bet, index) => (
                <BetInput
                    key={ index }
                    price={ 3 }
                    bet={ bet }
                    onChange={ changes => betUpdate(index, changes) }
                />
            )) }

        </Container>

    </>;

}
