import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, {Countdown} from './App.jsx'
import { BrowserRouter, } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
<StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter>
            {/* <Countdown /> */}
        </MantineProvider>
</StrictMode>
)