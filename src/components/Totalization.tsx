import map from "object-as-array/map";
import { Card, Col, Row } from "react-bootstrap";
import { probability, probabilityLevel } from "../helpers/math";

export type TotalizationProps = {
    quantity : number;
    price    : number;
}

const description : string[] = [
    'Muito Bom',
    'Bom',
    'Mediano',
    'Baixo',
    'Muito Baixo'
];

export default function Totalization({ quantity, price } : TotalizationProps) {

    const prob : number = probability(quantity);

    const data : Record<string, string[]> = {
        'Quantidade': [ quantity.toLocaleString('pt-br'), quantity === 1 ? 'jogo' : 'jogos' ],
        'Valor total': [ (quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) ],
        'Probabilidade': [ prob > 0 ? '1 em' : '', prob.toLocaleString(), prob > 0 ? '(' + description[probabilityLevel(prob)-1] + ')' : '' ]
    };

    return (

        <Row className="border-top border-bottom my-4">

            { map(data, (value, title) => (

                <Col key={ title } s={ 12 } md={ 6 } lg={ 4 }>
                    <Card className='my-3 text-center'>
                        <Card.Header className='alert alert-secondary m-0 h5'>{ title }</Card.Header>
                        <Card.Body className='fw-bold'>{ value.join(' ') }</Card.Body>
                    </Card>
                </Col>

            )) }

        </Row>

    );

}