import reduce from "object-as-array/reduce";

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
