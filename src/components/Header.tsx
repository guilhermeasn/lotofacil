import { Container, Navbar } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar as='header' bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Lotofácil</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
