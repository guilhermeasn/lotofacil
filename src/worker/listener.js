/* eslint-disable no-restricted-globals */

import * as math from '../helpers/math';

// script operation in a background thread

self.onmessage = ({ data }) => {
    if(typeof math[data.func] !== 'function') return;
    self.postMessage(math[data.func](...data.args));
};
