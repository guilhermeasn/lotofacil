import map from "object-as-array/map";
import reduce from "object-as-array/reduce";

import { useEffect, useState } from "react";
import { FloatingLabel, Form, Table } from "react-bootstrap";
import { Bet } from "../App";
import { Raffles } from "../helpers/fetch";
import { matches } from "../helpers/math";

import filter from "object-as-array/filter";
import Loading from "./Loading";

export type ProofingProps = {
    bets : Bet[];
    data : Raffles;
}

export default function Proofing({ data, bets } : ProofingProps) {

    const [ last, setLast ] = useState<number>(0);
    const [ hits, setHits ] = useState<Array<Record<number, number> | null>>([]);

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
        const dataset = map(filter(data, (_, k) => k >= selection[1] && k <= selection[2]), r => r);
        if(dataset) setHits(bets.map<Record<number, number> | null>(bet => bet.valid ? matches(bet.balls, dataset as number[][]) : null));
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
                    { Array(11).fill(5).map((v, k) => <th className="bg-light text-dark" key={ k }>{ k + v }&nbsp;Acertos</th>) }
                </tr>
            </thead>

            <tbody>
                { hits.map((hit, index) => (
                    <tr key={ index }>
                        
                        <th>#{ index + 1 }</th>

                        { hit === null
                            ? <td className="text-danger" colSpan={ 18 }>Aposta inválida! Verifique!</td>
                            : Array(11).fill(5).map((v, k) => <td key={ k }>{ hits?.[index]?.[k + v]?.toLocaleString('pt-br') ?? '0' }</td>)
                        }

                    </tr>
                )) }
            </tbody>

            <tfoot>
                <tr>
                    <th className="bg-dark text-light">TOTAL</th>
                    { Array(11).fill(5).map((v, k) => <th className="bg-dark text-light" key={ k }>{ reduce(hits, (total, hit) => total + ((hit as Record<number, number> | null)?.[k + v] ?? 0) ,0).toLocaleString('pt-br') }</th>) }
                </tr>
            </tfoot>
            
        </Table>

    </>;

}