import reduce from "object-as-array/reduce";

import { useEffect, useState } from "react";
import { FloatingLabel, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Raffles } from "../helpers/fetch";
import { whoMatches } from "../helpers/math";

import filter from "object-as-array/filter";
import Loading from "./Loading";

export type ProofingProps = {
    bets : number[][];
    data : Raffles;
}

export default function Proofing({ data, bets } : ProofingProps) {

    const [ last, setLast ] = useState<number>(0);
    const [ hits, setHits ] = useState<Array<Record<number, number[]> | null>>([]);

    useEffect(() => { if(data) setLast(parseInt(Object.keys(data)[Object.keys(data).length-1])); }, [ data, bets ]);

    const [ selection, setSelection ] = useState<[ boolean, number, number ]>([ true, 1, 1 ]);
    useEffect(() => { if(data) setSelection([ true, 1, last ])}, [ data, last ]);

    const onSelection = (end : number) : void => {
        if(!end) setSelection([ false, selection[1], selection[2] ]);
        else setSelection([ true, last - end + 1, last ]);
    }

    const onUserSelection = (position : 'start' | 'end', num : number) : void => {
        if(num < 1) num = 1;
        if(num > last) num = last;
        setSelection([
            false,
            position === 'start' ? num : selection[1],
            position === 'end' ? num : selection[2]
        ]);
    }

    useEffect(() => {
        if(!data) return;
        const dataset = filter(data, (_, k) => k >= selection[1] && k <= selection[2]) as Record<number, number[]>;
        if(dataset) setHits(bets.map(bet => whoMatches(bet, dataset)));
    }, [bets, data, selection]);

    return !data ? <Loading /> : <>

        <div className="d-sm-flex justify-content-center mb-4">

            <FloatingLabel className="mx-3" label="Comparar com">
                <Form.Select disabled={ !last } onChange={ input => onSelection(parseInt(input.currentTarget.value)) } defaultValue={ last.toString() }>
                    <option value={ last.toString() }>todos os sorteios</option>
                    <option value="30">últimos trinta sorteios</option>
                    <option value="24">últimos vinte e quatro sorteios</option>
                    <option value="18">últimos dezoito sorteios</option>
                    <option value="12">últimos doze sorteios</option>
                    <option value="6">últimos seis sorteios</option>
                    <option value="3">últimos três sorteios</option>
                    <option value="1">último sorteio</option>
                    <option value="0">personalizado</option>
                </Form.Select>
            </FloatingLabel>

            <FloatingLabel className="mx-3" label="Sorteio Inicial">
                <Form.Control
                    type="number"
                    value={ selection[1] }
                    disabled={ selection[0] }
                    onChange={ input => onUserSelection('start', parseInt(input.currentTarget.value))}
                />
            </FloatingLabel>

            <FloatingLabel className="mx-3" label="Sorteio Final">
                <Form.Control
                    type="number"
                    value={ selection[2] }
                    disabled={ selection[0] }
                    onChange={ input => onUserSelection('end', parseInt(input.currentTarget.value))}
                />
            </FloatingLabel>

        </div>

        <Table variant="info" striped hover responsive>

            <thead>
                <tr className="text-center">
                    <th className="bg-light text-dark">Apostas</th>
                    { Array(11).fill(5).map((v, k) => (
                        <th className="bg-light text-dark" key={ k }>
                            { k + v }&nbsp;Acertos
                        </th>
                    )) }
                </tr>
            </thead>

            <tbody>
                { hits.length ? hits.map((_, index) => (
                    <tr key={ index }>
                        
                        <OverlayTrigger overlay={ <Tooltip>{ bets[index].map(bet => bet < 10 ? `0${bet}` : bet.toString()).join('-') }</Tooltip> }>
                            <th>#{ index + 1 }</th>
                        </OverlayTrigger>

                        { Array(11).fill(5).map((v, k) => (
                            <OverlayTrigger key={ k } overlay={ <Tooltip>Sorteios: { hits?.[index]?.[k + v]?.join(', ')?.toString() ?? 'zero' }</Tooltip> }>
                                <td key={ k } onDoubleClick={ () => console.log(hits?.[index]?.[k + v]?.join()?.toString() ?? 'zero') }>
                                    { hits?.[index]?.[k + v]?.length.toLocaleString('pt-br') ?? '0' }
                                </td>
                            </OverlayTrigger>
                        )) }

                    </tr>
                )) : (
                    <tr>
                        <td className="text-danger ps-4" colSpan={ 12 }>
                            Nenhum aposta inserida!
                        </td>
                    </tr>
                ) }
            </tbody>

            <tfoot>
                <tr>
                    <th className="bg-dark text-light">TOTAL</th>
                    { Array(11).fill(5).map((v, k) => (
                        <th className="bg-dark text-light" key={ k }>
                            { reduce(hits, (total, hit) => total + ((hit as Record<number, number[]> | null)?.[k + v]?.length ?? 0) ,0).toLocaleString('pt-br') }
                        </th>
                    )) }
                </tr>
            </tfoot>
            
        </Table>

    </>;

}