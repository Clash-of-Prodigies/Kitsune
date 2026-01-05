import React, {useState, useEffect, useRef} from 'react';
import { Route, Routes} from 'react-router-dom';

import '@mantine/core/styles.css';
import './App.css';

import Home from './pages/home';
import Shop from './pages/shop';
import Unknown from './pages/unknown';
import Lobby from './pages/lobby';

export default function App() {
	const [dossier, Mutate] = useState({});
	const [broadcast, Listen] = useState({});
	const [loading, Load] = useState(true);
	const [error, Spit] = useState(null);
	const [playlist, Stream] = useState([])
	const musicPlayer = useRef(null);

	const navButtons = [
		{ icon: 'Home', label: 'Home', color: 'purple', link: '/' },
		{ icon: 'Team', label: 'Team', link: 'team-management'},
		{ icon: 'Shop', label: 'Shop', badge: 1, link: 'shop'},
	];

	useEffect(() => {
		if (!loading) return;
		Promise.all([
			fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include"
			})
			.then(res => res.json()),
			fetch(`${import.meta.env.VITE_BACKEND_URL}/broadcast`, {
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include"
			})
			.then(res => res.json()),
		])
		.then(([user, announcements, ]) => [user, announcements, ])
		.then(([d, p, ]) => {Mutate(d); Listen(p); Stream(p.playlists[d?.info.playlist]); console.log(p);})
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
			<Route path="/shop" element={<Shop ui={globalUI} dossier={dossier.info} pages={navButtons} />} />
			<Route path='/lobby' element={<Lobby />} />
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