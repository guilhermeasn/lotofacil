import { Container, Navbar } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar as='header' bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Lotofácil</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
