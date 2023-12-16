import { Badge, Form } from "react-bootstrap";

export type BetQuantityProps = {
    quantity : number;
    onChange : (quantity : number) => void;
}

export default function BetQuantity({ quantity, onChange } : BetQuantityProps) {

    return (

        <div className="my-4">

            <Form.Label>Quantidade de Apostas</Form.Label>

            <div className="d-flex">

                <Form.Range
                    value={ quantity }
                    onChange={ input => onChange(parseInt(input.currentTarget.value)) }
                    min={ 1 }
                    max={ 30 }
                />

                <Badge bg="secondary" className="ms-3 p-2">
                    { quantity }
                </Badge>

            </div>
        </div>

    )

}
