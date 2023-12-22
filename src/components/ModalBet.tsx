import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Ticket from "./Ticket";

export type ModalBetProps = {
    show   : boolean
    balls  : number[];
    onHide : () => void;
    onSave : (balls : number[]) => void;
}

export default function ModalBet({ show, balls, onHide, onSave } : ModalBetProps) {

    const [ actives, setActives ] = useState<number[]>(balls);

    const onActive = (num : number) : void => setActives(actives => (
        actives.some(active => active === num)
            ? actives.filter(active => active !== num)
            : actives.length < 20
                ? [ ...actives, num ]
                : actives
    ));

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
                        { actives.length } números foram escolhidos
                    </Alert>

                )) : (

                    <Alert className="text-center" variant="dark">
                        Escolha de 15 à 20 números
                    </Alert>

                ) }
                
                <Ticket
                    actives={ actives }
                    onClick={ onActive }
                />

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Cancelar
                </Button>

                <Button variant="outline-success" onClick={ () => actives.length < 15 || onSave(actives.sort((a, b) => a - b)) } disabled={ actives.length < 15 }>
                    Salvar
                </Button>

            </Modal.Footer>

      </Modal>

    );

}
