import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, {Countdown} from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
<StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <HashRouter><App /></HashRouter>
            <Countdown />
        </MantineProvider>
</StrictMode>
)