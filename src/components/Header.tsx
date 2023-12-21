import { Container, Navbar } from "react-bootstrap";
import { FaChartLine, FaEye } from 'react-icons/fa';

export type HeaderProps = {
    onRaffle  ?: () => void;
    onStatistic ?: () => void;
}

export default function Header({ onRaffle, onStatistic } : HeaderProps) {
    return (
        <Navbar as='header' bg="primary" data-bs-theme="dark">
            <Container className="user-select-none">
                <Navbar.Brand href=".">Lotofácil</Navbar.Brand>
                <div className="text-light d-flex">
                    <div className="clickable me-2" title="Sorteios" onClick={ onRaffle }>
                        <FaEye size={ 25 } />
                        <span className="d-none d-md-inline-block">&nbsp;Sorteios</span>
                    </div>
                    <div className="clickable ms-2" title="Estatística" onClick={ onStatistic }>
                        <FaChartLine size={ 25 } />
                        <span className="d-none d-md-inline-block">&nbsp;Estatística</span>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}
