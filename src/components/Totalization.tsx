import map from "object-as-array/map";
import { useMemo } from "react";
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

    const prob : number = useMemo(() => probability(quantity), [ quantity ]);

    const data : Record<string, string[]> = useMemo(() => ({
        'Quantidade': [ quantity.toLocaleString('pt-br'), quantity === 1 ? 'jogo' : 'jogos' ],
        'Valor total': [ (quantity * price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) ],
        'Probabilidade': [ prob > 0 ? '1 em' : '', prob.toLocaleString(), prob > 0 ? '(' + description[probabilityLevel(prob)-1] + ')' : '' ]
    }), [ price, prob, quantity ]);

    return (

        <Row>

            { map(data, (value, title) => (

                <Col key={ title } s={ 12 } md={ 6 } lg={ 4 }>
                    <Card className='my-3 text-center'>
                        <Card.Header className='alert alert-info m-0 h5'>{ title }</Card.Header>
                        <Card.Body className='alert alert-secondary rounded-0 m-0'>{ value.join(' ') }</Card.Body>
                    </Card>
                </Col>

            )) }

        </Row>

    );

}