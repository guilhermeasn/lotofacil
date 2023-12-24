import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './helpers/bootstrapCustom.scss';
import './helpers/loading.css';
import './helpers/style.css';

createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <StrictMode>
        <App />
    </StrictMode>
);
