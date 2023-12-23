import { FormControl, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaChartLine, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export type BetProps = {
    cod      : string;
    bet      : number[];
    warn    ?: boolean;
    onDetail : () => void;
    onUpdate : () => void;
    onDelete : () => void;
}

export default function Bet({ cod, bet, warn = false, onDetail, onDelete, onUpdate } : BetProps) {

    const betText : string = bet.map(num => (num < 10 ? '0' : '') + num.toString()).join('-');

    return (

        <InputGroup className="my-1">
    
            <InputGroup.Text className="bg-dark text-light">
                { cod }
            </InputGroup.Text>

            <OverlayTrigger placement="bottom" overlay={ <Tooltip>{ `${bet.length} números: ${betText}` }</Tooltip> }>
                <FormControl
                    className={ warn ? "input-warn" : undefined }
                    value={ betText }
                    onChange={ undefined }
                    disabled
                />
            </OverlayTrigger>

            <InputGroup.Text className="bg-info text-dark clickable" onClick={ onDetail }>
                <FaChartLine />
            </InputGroup.Text>

            <InputGroup.Text className="bg-warning text-dark clickable" onClick={ onUpdate }>
                <FaPencilAlt />
            </InputGroup.Text>

            <OverlayTrigger placement="bottom" overlay={ <Tooltip>Duplo click para deletar</Tooltip> }>
                <InputGroup.Text className="bg-danger text-light clickable" onDoubleClick={ onDelete }>
                    <FaTrashAlt />
                </InputGroup.Text>
            </OverlayTrigger>

        </InputGroup>

    );

}