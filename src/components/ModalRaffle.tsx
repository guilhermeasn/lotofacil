import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, Modal, Overlay, Tooltip } from "react-bootstrap";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Raffles } from "../helpers/fetch";
import Loading from "./Loading";
import Ticket from "./Ticket";

export type ModalRaffleProps = {
    data     : Raffles;
    show     : boolean;
    onHide   : () => void;
    onDetail : (bet : number[]) => void;
}

export default function ModalRaffle({ data, show, onHide, onDetail } : ModalRaffleProps) {

    const max : number | undefined = data ? parseInt(Object.keys(data)[Object.keys(data).length-1]) : undefined;

    const buttonCopy = useRef(null);
    const [ alert, setAlert ] = useState<boolean>(false);
    const [ selection, setSelection ] = useState<[ number | undefined, number[] ]>();

    const onSelection = (num : number) : void => {
        if(!data || !max) return;
        if(isNaN(num)) setSelection(selection ? [ undefined, [] ] : undefined);
        if(num < 1) num = 1;
        if(num > max) return;
        setSelection([ num, data[num] ]);
    }

    const onCopy = () : void => {
        if(!selection) return;
        if(!copy(selection[1].sort((a, b) => a - b).map(n => (n < 10 ? '0' : '') + n.toString()).join('-'))) return;
        setAlert(true);
        setTimeout(() => setAlert(false), 5000);
    }

    useEffect(() => {
        if(!data || !max) return;
        setSelection([ max, data[max] ]);
    }, [ data, max, show ]);

    return (

        <Modal show={ show } onHide={ onHide } centered>

            <Modal.Header className="alert alert-info rounded-bottom-0 user-select-none" closeButton>
                <Modal.Title>Sorteios Realizados</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                { selection ? <>

                    <div className="p-4 pt-0 d-flex">

                        <FaCaretLeft
                            onClick={ () => onSelection(selection && selection[0] ? selection[0] - 1 : 1) }
                            className="clickable text-primary"
                            size={ 50 }
                        />

                        <FormControl
                            className="text-center"
                            type="number"
                            min={ 1 }
                            max={ max }
                            value={ selection[0] }
                            onChange={ input => onSelection(parseInt(input.currentTarget.value)) }
                        />

                        <FaCaretRight
                            onClick={ () => onSelection(selection && selection[0] ? selection[0] + 1 : max ?? 1) }
                            className="clickable text-primary"
                            size={ 50 }
                        />

                    </div>

                    <Ticket variant="success" actives={ selection[1] } />

                </> : <Loading /> }

            </Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={ onHide }>
                    Fechar
                </Button>

                <Button variant="outline-warning" onClick={ selection && Array.isArray(selection[1]) ? () => onDetail(selection[1]) : undefined } disabled={ !selection || selection[1] === undefined }>
                    Detalhar
                </Button>

                <Button ref={ buttonCopy } variant="outline-success" onClick={ onCopy } disabled={ !selection || selection[1] === undefined }>
                    Copiar
                </Button>

                <Overlay target={ buttonCopy.current } show={ alert } placement="top">
                    { (props) => (
                        <Tooltip { ...props }>
                            Os números do sorteio foram copiados!
                        </Tooltip>
                    ) }
                </Overlay>

            </Modal.Footer>

      </Modal>

    );

}
