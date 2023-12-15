import { applyMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";

export type BetInputProps = {
    onChange ?: (value : string, valid : boolean) => void;
}

export default function BetInput({ onChange = () => {} } : BetInputProps) {

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
        onChange(value, valid);

    }, [ value, quantity, onChange ]);

    return (

        <InputGroup className="mb-3">

            <DropdownButton variant="dark" title={ `${quantity} números` }>
                { Array.from({ length: 6 }, (_, k) => k + 15).map(n => (
                    <Dropdown.Item onClick={ () => setQuantity(n) }>{ `${n} números` }</Dropdown.Item>
                )) }
            </DropdownButton>

            <Form.Control
                value={ value }
                className={ !value || test ? undefined : 'input-error' }
                onChange={ input => setValue(applyMask(input.currentTarget.value, { masks: [ mask ] })) }
            />

        </InputGroup>

    )
}
