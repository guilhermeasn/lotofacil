import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Ticket from "./Ticket";

export type ModalBetProps = {
    show   : boolean
    bet    : number[];
    onHide : () => void;
    onSave : (bet : number[]) => void;
}

export default function ModalBet({ show, bet, onHide, onSave } : ModalBetProps) {

    const [ actives, setActives ] = useState<number[]>([]);
    useEffect(() => setActives(bet), [ show, bet ]);

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

        <Modal show={ show } centered>

            <Modal.Header className="alert alert-primary rounded-bottom-0 user-select-none">
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
