import { writeFileSync } from "fs";

import combinacoes from "./combinacoes.json";
import combinacoes5 from "./combinacoes5.json";

import objectAsArray from "object-as-array";

writeFileSync(
    'combinacoesOrdenadas.json',
    JSON.stringify(
        objectAsArray(combinacoes).sort(
            'value',
            (va, vb) => vb - va
        ),
        undefined,
        2
    )
);

writeFileSync(
    'combinacoesOrdenadas5.json',
    JSON.stringify(
        objectAsArray(combinacoes5).sort(
            'value',
            (va, vb) => vb - va
        ),
        undefined,
        2
    )
);
