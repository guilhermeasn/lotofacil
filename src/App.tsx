import { Container } from "react-bootstrap";
import BetInput from "./components/BetInput";
import Header from "./components/Header";

export default function App() {

    return <>

       <Header />

        <Container as='main' className="py-3">
            <BetInput />
        </Container>

    </>;

}
