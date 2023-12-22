import { Container } from "react-bootstrap";

export default function Footer() {

    return (

        <footer>
            <hr className="mb-0" />
            <Container className="d-flex justify-content-between">
                <a href="https://github.com/guilhermeasn/lotofacil/" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://gn.dev.br/" target="_blank" rel="noopener noreferrer">
                    &lt;gn.dev.br/&gt;
                </a>
            </Container>
        </footer>

    );

}