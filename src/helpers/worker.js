/* eslint-disable no-restricted-globals */

import * as math from './math';

self.onmessage = ({ data }) => {
    if(!(data.func in math)) return;
    self.postMessage(math[data.func](...data.args));
};
