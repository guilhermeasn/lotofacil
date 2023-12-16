import { applyMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { bets } from "../helpers/math";

export type BetInputProps = {
    price ?: number;
    onChange ?: (value : string, valid : boolean, quantity : number) => void;
}

export default function BetInput({ price = 3, onChange = () => {} } : BetInputProps) {

    const [ test, setTest ] = useState<boolean>(false);
    const [ mask, setMask ] = useState<string>('');
    const [ value, setValue ] = useState<string>('');
    const [ quantity, setQuantity ] = useState<number>(15);

    useEffect(() => setMask(Array.from({ length: quantity }, () => '[1-25]').join('-')), [ quantity ]);
    useEffect(() => setValue(value => applyMask(value, { masks: [ mask ] })), [ mask ]);

    useEffect(() => {

        const pieces : number[] = value.split('-').map(v => parseInt(v));

        const valid : boolean = (
            value.length === quantity * 3 - 1 &&
            pieces.length === quantity &&
            !pieces.some(p => p < 1 || p > 25) &&
            (new Set(pieces)).size === pieces.length
        );

        setTest(valid);
        onChange(value, valid, quantity);

    }, [ value, quantity, onChange ]);

    return (

        <InputGroup className="mb-3">

            <DropdownButton variant="dark" title={ quantity.toString() }>
                { Array.from({ length: 6 }, (_, k) => k + 15).map(n => (
                    <Dropdown.Item key={ n } onClick={ () => setQuantity(n) }>{ `${n} números` }</Dropdown.Item>
                )) }
            </DropdownButton>

            <Form.Control
                value={ value }
                className={ value ? test ? 'input-success' : 'input-error' : undefined }
                onChange={ input => setValue(applyMask(input.currentTarget.value, { masks: [ mask ] })) }
            />

            <InputGroup.Text className="d-none d-md-inline-block">
                { (value ? bets(quantity) * price : 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </InputGroup.Text>

        </InputGroup>

    )
}
