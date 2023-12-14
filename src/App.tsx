import { Container, Navbar } from "react-bootstrap";

export default function App() {

    return <>

        <Navbar as='header' bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Lotofácil</Navbar.Brand>
            </Container>
        </Navbar>

        <Container as='main'>
            
        </Container>

    </>;

}
