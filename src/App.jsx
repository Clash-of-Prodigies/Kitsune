import {useState, useEffect, useRef, } from 'react';
import { Route, Routes} from 'react-router-dom';

import '@mantine/core/styles.css';
import './App.css';

import { AUTH_PAGE_BASE, API_URL } from './utils';

import Home from './pages/home';
import Unknown from './pages/unknown';
import Shop from './pages/shop';

export default function App() {
	const [dossier, Mutate] = useState({});
	const [broadcast, Listen] = useState({});
	const [loading, Load] = useState(true);
	const [error, Spit] = useState(null);
	const [playlist, Stream] = useState([])
	const musicPlayer = useRef(null);


	const navButtons = [
		{ icon: 'Home', label: 'Home', color: 'purple', link: '/' },
		{ icon: 'Team', label: 'Management', link: 'management'},
		{ icon: 'Shop', label: 'Shop', link: 'shop'},
	];

	useEffect(() => {
		if (!loading) return;
		const dossierUrl = new URL('data', API_URL);
		const broadcastUrl = new URL('broadcast', API_URL);
		Promise.all([
			fetch(dossierUrl, {
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
				credentials: "include"
			})
			.then(res => res.json()),
			fetch(broadcastUrl, {
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
				credentials: "include"
			})
			.then(res => res.json()),
		])
		.then(([user, announcements, ]) => [user, announcements, ])
		.then(([d, p, ]) => {
			if (!d || !d?.info) window.location.href = d?.redirect ?? AUTH_PAGE_BASE.toString();
			Mutate(d); Listen(p); Stream(p.playlists[d?.info?.playlist]);
			console.log(d);
		})
		.catch((err) => Spit(err))
		.finally(() => Load(false));
	}, [loading]);

	useEffect(() => {
		if (!musicPlayer.current) return;
		musicPlayer.current.src = playlist ? `${import.meta.env.VITE_BACKEND_URL}/media/${playlist[0]}.mp3` : null ;
	}, [playlist])

	if (loading) return null;
	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const globalUI = {
		musicPlayer,
		loading, Load,
	}

	return (
	<>
		<audio ref={musicPlayer} muted style={{ display: 'none' }}
		onEnded={() => {
			const tempPlaylist = [...playlist];
			tempPlaylist.push(tempPlaylist.shift());
			Stream(tempPlaylist);
		}}/>
		<Routes>
			<Route index element={<Home ui={globalUI} dossier={dossier} broadcast={broadcast} pages={navButtons} />} />
			<Route path="/home" element={<Home ui={globalUI} dossier={dossier} broadcast={broadcast} pages={navButtons} />} />
			<Route path="/management" element={<Unknown />} />
			<Route path="/shop" element={<Shop />} />
			<Route path="*" element={<Unknown />} />
		</Routes>
	</>		
  );
}

import { CountdownTimer } from './components/CountdownTimer';
export function Countdown() {
	const [target, _] = useState(
		() => new Date('2026-01-11T23:59:59')
	);

  return ( <CountdownTimer targetDate={target} label="Time remaining"   eventName="Clash of Prodigies"
  tagline="The arena awakens. The prodigies arrive." />);
};