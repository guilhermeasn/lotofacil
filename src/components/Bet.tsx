import { FormControl, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaChartLine, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export type BetProps = {
    index : number;
    bet   : number[];
    warn ?: boolean;
    onDetail : () => void;
    onUpdate : () => void;
    onDelete : () => void;
}

export default function Bet({ index, bet, warn = false, onDetail, onDelete, onUpdate } : BetProps) {

    const betText : string = bet.map(num => (num < 10 ? '0' : '') + num.toString()).join('-');

    return (

        <InputGroup className="my-3">
    
            <InputGroup.Text className="bg-dark text-light">
                { index + 1 }
            </InputGroup.Text>

            <OverlayTrigger placement="bottom" overlay={ <Tooltip>{ betText }</Tooltip> }>
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

            <InputGroup.Text className="bg-danger text-light clickable" onClick={ onDelete }>
                <FaTrashAlt />
            </InputGroup.Text>

        </InputGroup>

    );

}