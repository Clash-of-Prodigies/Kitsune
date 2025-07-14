import './App.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home.js';
import About from './pages/about.js';
import Unknown from './pages/unknown.js';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';

function App() {
	return (
	<HashRouter>
		<Routes>
			<Route index path="/" element={
				<React.StrictMode>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<Home />
					</MantineProvider>
				</React.StrictMode>
			} />
			<Route path="/about" element={
				<React.StrictMode>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<About />
					</MantineProvider>
				</React.StrictMode>
				} />
			<Route path="*" element={
				<React.StrictMode>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<Unknown />
					</MantineProvider>
				</React.StrictMode>
				} />
		</Routes>
	</HashRouter>		
  );
}

export default App;
