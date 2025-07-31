import { Box, Container, Center, Stack } from '@mantine/core';
import { IconNews, IconCalendar, IconTournament, IconHours24, IconSparkles, } from '@tabler/icons-react';
import { IconHome, IconUser, IconTrophy, IconBarbell, IconSettings, } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import SidebarButton from '../components/SideBarButton';
import ProfileCard from '../components/ProfileCard';
import NewsCard from '../components/NewsCard';
import CalendarCard from '../components/CalendarCard';
import SettingsCard from '../components/SettingsCard';

function LeftSidebar({ ui = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' left={10}>
		<SidebarButton icon={<IconUser />} action={() => ui.AdmireProfile(true)} />
		<SidebarButton icon={<IconSettings />} action={() => ui.OpenSettings(true)}/>
		<SidebarButton icon={<IconNews />} action={() => ui.ReadNews(true)}/>
		<SidebarButton icon={<IconCalendar />} action={() => ui.ViewCalendar(true)} />
    </Stack>
	);
}

function RightSidebar({ ui = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' right={10}>
		<SidebarButton icon={<IconTrophy />} />
		<SidebarButton icon={<IconHome />} />
		<SidebarButton icon={<IconTournament />} />
		<SidebarButton icon={<IconHours24 />}  badge={1}/>
		<SidebarButton icon={<IconBarbell />} />
		<SidebarButton icon={<IconSparkles />} />
    </Stack>
  );
}

function Layout({ children, ui }) {
	return (
    <Container fluid px={0} h='100vh' display='flex' style={{
        overflow: 'hidden', backgroundColor: '#e0f0ff', flexDirection: 'column',
    }}>
		{/* Top bar */}
		<Box p="sm"><ResourceBar /></Box>
		
		{/* Main content */}
		<Box flex={1} pos='relative'  px="md" pt="sm" style={{ overflowY: 'auto',}}>
			<LeftSidebar ui={ui}/>
			<RightSidebar ui={ui}/>
			{children}
		</Box>

      	{/* Bottom nav */}
      	<Box p="sm"><BottomNav /></Box>
    </Container>
	);
}

export default function Home() {
	const [dossier, Mutate] = useState({});
	const [broadcast, Listen] = useState({});
  	const [loading, Load] = useState(true);  // Tracks loading state
  	const [error, Spit] = useState(null);      // Tracks errors
	const [admireProfile, AdmireProfile] = useState(false);
	const [readNews, ReadNews] = useState(false);
	const [viewCalendar, ViewCalendar] = useState(false);
	const [openSettings, OpenSettings] = useState(false);

  	useEffect(() => {
		if (!loading) return;
		Promise.all([
			fetch('http://localhost:5000/data').then(res => res.json()),
			fetch('http://localhost:5000/broadcast').then(res => res.json()),
		])
		.then(([user, announcements,]) =>  [user, announcements,])
		.then((res) => {Mutate(res[0]); Listen(res[1]); /*console.log(res); */})
		.catch((err) => Spit(err))
		.finally(() => Load(false));
	}, [loading]);
	
	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const globalUI = {
		admireProfile, AdmireProfile,
		readNews, ReadNews,
		viewCalendar, ViewCalendar,
		openSettings, OpenSettings,
		loading, Load,
	}

	return (
	<Layout ui={globalUI}>
		<Center h='100%'>
			<ProfileCard ui={globalUI} data={dossier.info} avatars={broadcast.avatars} />
			<NewsCard ui={globalUI} articles={broadcast.news} />
			<CalendarCard ui={globalUI} />
			<SettingsCard ui={globalUI} data={dossier.info} />
      	</Center>
	</Layout>
	);
}