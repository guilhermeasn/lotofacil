import reduce from "object-as-array/reduce";
import { Bet } from "../App";

export type Raffles = Record<number, number[]> | null;

export async function raffles() : Promise<Raffles> {

    try {

        const URL = 'https://raw.githubusercontent.com/guilhermeasn/loteria.json/master/data/lotofacil.json';
        const respost = await fetch(URL);
        const result = await respost.json();
        
        return reduce(result, (p, c, k) => ({ ...p, [parseInt(k.toString())]: c.map((v:any) => parseInt(v)) }), {});

    } catch(err) {

        console.error(err);
        return null;

    }

}

export function save(bets : Bet[]) : boolean {
    try {
        localStorage.setItem('lotofacil_bets', JSON.stringify(bets));
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
}

export function restore() : Bet[] | null {
    try {
        const data = localStorage.getItem('lotofacil_bets');
        return data ? JSON.parse(data) : null;
    } catch(error) {
        console.error(error);
        return null;
    }
}