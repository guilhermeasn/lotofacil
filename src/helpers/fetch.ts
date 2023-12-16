export async function raffles() : Promise<Record<number, number[]>> {

    const URL = 'https://raw.githubusercontent.com/guilhermeasn/loteria.json/master/data/lotofacil.json';
    const respost = await fetch(URL);
    
    return await respost.json();

}
