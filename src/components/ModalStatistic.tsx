import map from "object-as-array/map";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Statistic, statistic } from "../helpers/fetch";

export type ModalStatisticProps = {
    show : boolean;
    onHide : () => void;
}

export default function ModalStatistic({ show, onHide } : ModalStatisticProps) {

    const [ data, setData ] = useState<Statistic | null>(null);
    useEffect(() => { if(!data) statistic().then(setData); }, [ data ]);
    
    return (
        
        <Modal show={ show } onHide={ onHide } centered>

            <Modal.Header className="alert alert-warning rounded-bottom-0" closeButton>
                <Modal.Title>Estatística</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { data && map(data, (v, k) => (
                    <div key={ k }>
                        <h3 className="border-bottom">{ k }</h3>
                        <p>{ map(v, (c, t) => t + ': ' + JSON.stringify(c, undefined, 2)).join(' | ') }</p>
                    </div>
                )) }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ onHide }>
                    Fechar
                </Button>
            </Modal.Footer>

      </Modal>

    );

}