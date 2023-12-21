import { Container, Navbar } from "react-bootstrap";
import { FaChartLine, FaEye } from 'react-icons/fa';

export type HeaderProps = {
    onRaffle  ?: () => void;
    onStatistic ?: () => void;
}

export default function Header({ onRaffle, onStatistic } : HeaderProps) {
    return (
        <Navbar as='header' bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Lotofácil</Navbar.Brand>
                <div className="text-light d-flex">
                    <div className="clickable me-3" onClick={ onRaffle }>
                        <FaEye size={ 25 } /> Sorteios
                    </div>
                    <div className="clickable" onClick={ onStatistic }>
                        <FaChartLine size={ 25 } /> Estatística
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}
