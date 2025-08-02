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
	const [broadcast, Listen] = useState({});
	const [loading, Load] = useState(true);
	const [error, Spit] = useState(null);
	const [playlist, Stream] = useState([])
	const musicPlayer = useRef(null);

	useEffect(() => {
		if (!loading) return;
		Promise.all([
			fetch('http://localhost:5000/data').then(res => res.json()),
			fetch('http://localhost:5000/broadcast').then(res => res.json()),
		])
		.then(([user, announcements, ]) => [user, announcements, ])
		.then((res) => {Mutate(res[0]); Listen(res[1]); Stream(res[1].playlists[res[0].info.playlist]); /*console.log(res);*/})
		.catch((err) => Spit(err))
		.finally(() => Load(false));
	}, [loading]);

	useEffect(() => {
		if (!musicPlayer.current) return;
		musicPlayer.current.src = playlist ? `http://localhost:5000/media/${playlist[0]}.mp3` : null ;
	}, [playlist])

	if (loading) return null;
	// if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const globalUI = {
		musicPlayer,
		loading, Load,
	}

	return (
	<HashRouter>
		<audio ref={musicPlayer} muted autoPlay style={{ display: 'none' }}
		onEnded={() => {
			const tempPlaylist = [...playlist];
			tempPlaylist.push(tempPlaylist.shift());
			Stream(tempPlaylist);
		}}/>
		<Routes>
			<Route index path="/" element={
				<React.StrictMode>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<Home ui={globalUI} dossier={dossier} broadcast={broadcast} />
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
