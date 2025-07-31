import './App.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home.js';
import About from './pages/about.js';
import Unknown from './pages/unknown.js';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {useState, useEffect, useRef} from 'react';
import React from 'react';

export default function App() {
	const [dossier, Mutate] = useState({});
	const [loading, Load] = useState(true);
	const [error, Spit] = useState(null);
	const musicPlayer = useRef(null);

	useEffect(() => {
		if (!loading) return;
		Promise.all([
			fetch('http://localhost:5000/data').then(res => res.json()),
		])
		.then(([user,]) =>  [user,])
		.then((res) => {Mutate(res[0]); console.log(res[0]);})
		.catch((err) => Spit(err))
		.finally(() => Load(false));
	}, [loading]);

	if (loading) return null;
	// if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const globalUI = {
		musicPlayer,
		loading, Load,
	}

	return (
	<HashRouter>
		<audio ref={musicPlayer} muted autoPlay loop style={{ display: 'none' }}
		src={dossier?.info?.playlist ? `http://localhost:5000/media/${dossier.info.playlist}.mp3` : ''} />
		<Routes>
			<Route index path="/" element={
				<React.StrictMode>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<Home ui={globalUI} dossier={dossier}/>
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
