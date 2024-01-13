import * as math from '../helpers/math';

export type MathFuncs = keyof typeof math;
export type MathFunc<F extends MathFuncs> = typeof math[F];

export type MathFuncTypes<F extends MathFuncs> = MathFunc<F> extends (...args : infer A) => infer R ? {
    args : A;
    return : R;
} : never;

export default function trigger<F extends MathFuncs>(func : F, ...args : MathFuncTypes<F>['args']) : Promise<MathFuncTypes<F>['return']> {
    
    return new Promise((resolve, reject) => {

        if(typeof math[func] !== 'function') {
            reject(Error('function was not found in math'))
            return;
        }

        if(!Worker) {
            // @ts-ignore
            setTimeout(() => resolve(math[func](...args)));
            return;
        }

        const worker = new Worker(new URL('./listener.js', import.meta.url));

        worker.onmessage = ({ data }) => resolve(data);
        worker.postMessage({ func, args });

    });

}
