import { useMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Alert, Button, FormControl, Modal } from "react-bootstrap";
import Ticket from "./Ticket";

export type ModalBetProps = {
    show   : boolean
    bet    : number[];
    onHide : () => void;
    onSave : (bet : number[]) => void;
}

export default function ModalBet({ show, bet, onHide, onSave } : ModalBetProps) {

    const mask = useMask({ masks: [ Array(20).fill('[1-25]').join('-') ] });

    const [ value, setValue ] = useState<string>('');
    const [ valid, setValid ] = useState<boolean | null>(null);
    const [ actives, setActives ] = useState<number[]>([]);

    useEffect(() => setActives(bet), [ show, bet ]);

    useEffect(() => {
        setValue(actives.map(num => (num < 10 ? '0' : '') + num.toString()).join('-'));
        setValid(valid => actives.length < 15 ? valid : true);
    }, [ actives ]);
    
    useEffect(() => {

        if(!value) {
            setActives([]);
            setValid(null);
            return;
        }

        if(value.split('-').some(num => num.length !== 2)) {
            setValid(false);
            return;
        }

        const bet : number[] = value.split('-').map(num => parseInt(num));

        if(bet.some(num => num > 25 || num < 1 || isNaN(num)) || (new Set(bet)).size !== bet.length) {
            setValid(false);
            return;
        }

        setActives(bet);
        setValid(bet.length > 15 ? true : null);

    }, [ value ]);

    const onActive = (num : number) : void => setActives(actives => (
        actives.some(active => active === num)
            ? actives.filter(active => active !== num)
            : actives.length < 20
                ? [ ...actives, num ]
                : actives
    ));

    const save = () : void => {
        if(actives.length < 15) return;
        onSave(actives.sort((a, b) => a - b));
        onHide();
    }

    return (

        <Modal show={ show } onHide={ onHide } centered>

            <Modal.Header className="alert alert-primary rounded-bottom-0 user-select-none" closeButton>
                <Modal.Title>Aposta</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { actives.length ? (actives.length < 15 ? (

                    <Alert className="text-center" variant="warning">
                        Escolha mais { 15 - actives.length } número{ 15 - actives.length !== 1 && 's' }
                    </Alert>

                ) : (

                    <Alert className="text-center" variant="success">
                        { actives.length } números escolhidos
                    </Alert>

                )) : (

                    <Alert className="text-center" variant="dark">
                        Escolha de 15 à 20 números
                    </Alert>

                ) }
                
                <Ticket
                    variant="primary"
                    actives={ actives }
                    onClick={ onActive }
                />

                <div className="p-3">
                    <FormControl
                        className={
                            valid === null
                                ? undefined
                                : (valid
                                        ? 'bg-success-subtle border-success text-success'
                                        : 'bg-danger-subtle border-danger text-danger'
                                    )
                        }
                        onChange={ input => setValue(mask(input.currentTarget.value).replace(/-$/, '')) }
                        value={ value }
                    />
                </div>

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ save } disabled={ actives.length < 15 }>
                    Salvar
                </Button>

            </Modal.Footer>

      </Modal>

    );

}
