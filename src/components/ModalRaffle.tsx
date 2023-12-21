import { useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { Raffles } from "../helpers/fetch";
import Loading from "./Loading";

export type ModalRaffleProps = {
    data : Raffles;
    show : boolean;
    onHide :  () => void;
}

export default function ModalRaffle({ data, show, onHide } : ModalRaffleProps) {

    const min : number | undefined = data ? parseInt(Object.keys(data)[0]) : undefined;
    const max : number | undefined = data ? parseInt(Object.keys(data)[Object.keys(data).length-1]) : undefined;

    const [ selection, setSelection ] = useState<[ number, number[] ]>();

    useEffect(() => {
        if(!data || !max) return;
        setSelection([ max, data[max] ]);
    }, [ data, max, show ]);

    return !selection ? <Loading /> : (

        <Modal show={ show } onHide={ onHide } centered>

            <Modal.Header className="alert alert-info rounded-bottom-0" closeButton>
                <Modal.Title>Sorteios</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className="p-4 pt-0">
                    <FormControl
                        className="text-center"
                        type="number"
                        min={ min }
                        max={ max }
                        value={ selection[0] }
                        onChange={ input => {
                            if(!data || !min || !max) return;
                            const num : number = parseInt(input.currentTarget.value);
                            if(num < min) return;
                            if(num > max) return;
                            if(!isNaN(num)) setSelection([ num, data[num] ]);
                        } }
                    />
                </div>

                { Array(5).fill(5).map((v, k) => (

                    <div key={ k } className="d-flex justify-content-center">

                        { Array(5).fill(k*v+1).map((v, k) => {

                            const num : number = k + v;
                            const hit : boolean = selection[1]?.some(num2 => num === num2) ?? false;

                            return (
                                <div
                                    key={ num }
                                    className={ "border m-1 p-3 h5 rounded-5" + (hit ? ' bg-success-subtle border-success text-success' : ' text-muted') }
                                >
                                    { (num < 10 ? '0' : '') + num.toString() }
                                </div>
                            );

                        }) }

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
