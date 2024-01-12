import * as math from './math';

export type MathFuncs = keyof typeof math;
export type MathFunc<F extends MathFuncs> = typeof math[F];

export type MathFuncTypes<F extends MathFuncs> = MathFunc<F> extends (...args : infer A) => infer R ? {
    args : A;
    return : R;
} : never;

export default function trigger<F extends MathFuncs>(func : F, ...args : MathFuncTypes<F>['args']) : Promise<MathFuncTypes<F>['return']> {
    
    return new Promise(resolve => {

        if(!Worker) {
            // @ts-ignore
            setTimeout(() => resolve(math[func](...args)));
            return;
        }

        const worker = new Worker(new URL('./worker.js', import.meta.url));

        worker.onmessage = ({ data }) => resolve(data);
        worker.postMessage({ func, args });

    });

}
