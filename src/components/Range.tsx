import { Badge, Form } from "react-bootstrap";

export type RangeProps = {
    className ?: string;
    label     ?: string;
    min       ?: number;
    max       ?: number;
    num        : number;
    onChange   : (num : number) => void;
    disabled  ?: boolean;
}

export default function Range({ className, label, min, max, num, onChange, disabled = false } : RangeProps) {

    return (

        <div className={ className }>

            { label && <Form.Label>{ label }</Form.Label> }

            <div className="d-flex">

                <Form.Range
                    value={ num.toString() }
                    onChange={ input => onChange(parseInt(input.currentTarget.value)) }
                    min={ min }
                    max={ max }
                    disabled={ disabled }
                />

                <Badge bg="secondary" className="ms-3 p-2">
                    { num }
                </Badge>

            </div>

        </div>

    );

}
