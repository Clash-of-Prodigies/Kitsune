import { Box, Container, Center, Stack, Paper, ActionIcon, Badge } from '@mantine/core';
import { IconNews, IconCalendar, IconTournament, IconHours24, IconSparkles, } from '@tabler/icons-react';
import { IconHome, IconUser, IconTrophy, IconBarbell, IconSettings, } from '@tabler/icons-react';
import { useState, } from 'react';
import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import ProfileCard from '../components/ProfileCard';
import NewsCard from '../components/NewsCard';
import CalendarCard from '../components/CalendarCard';
import SettingsCard from '../components/SettingsCard';

function LeftSidebarButton({ icon, badge, action = () => {} }) {
	return (
	<Paper shadow="sm" radius="lg" withBorder onClick={action} style={{
		position: 'relative', width: 50, height: 50
	}}>
		{badge && (
			<Badge color="red" variant="filled" size="xs" style={{
				position: 'absolute', top: -5, right: -5
			}}>
				{badge}
			</Badge>
		)}
		<ActionIcon variant="transparent" size="xl" w='100%' h='100%'>{icon}</ActionIcon>
	</Paper>
	);
}

function RightSidebarButton({ icon, badge, action = () => {} }) {
    return (
    <Paper shadow="sm" radius="lg" withBorder onClick={action} bdrs={'50%'} style={{
		position: 'relative', width: 50, height: 50
	}}>
		{badge && (
			<Badge color="red" variant="filled" size="xs" style={{
				position: 'absolute', top: -5, right: -5
			}}>
				{badge}
            </Badge>
        )}
    	<ActionIcon variant="transparent" size="xl" w='100%' h='100%'>{icon}</ActionIcon>
    </Paper>
	);
}


function LeftSidebar({ ui = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' left={10}>
		<LeftSidebarButton icon={<IconUser />} action={() => ui.AdmireProfile(true)} />
		<LeftSidebarButton icon={<IconNews />} action={() => ui.ReadNews(true)} />
		<LeftSidebarButton icon={<IconCalendar />} action={() => ui.ViewCalendar(true)} />
		<LeftSidebarButton icon={<IconSettings />} action={() => ui.OpenSettings(true)} />
    </Stack>
	);
}

function RightSidebar({ ui = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' right={10}>
		<RightSidebarButton icon={<IconTrophy />} />
		<RightSidebarButton icon={<IconHome />} />
		<RightSidebarButton icon={<IconTournament />} />
		<RightSidebarButton icon={<IconHours24 />}  badge={1} />
		<RightSidebarButton icon={<IconBarbell />} />
		<RightSidebarButton icon={<IconSparkles />} />
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

export default function Home({ ui = {}, dossier = {}, broadcast = {} }) {
	const [admireProfile, AdmireProfile] = useState(false);
	const [readNews, ReadNews] = useState(false);
	const [viewCalendar, ViewCalendar] = useState(false);
	const [openSettings, OpenSettings] = useState(false);

	const globalUI = {
		...ui,
		admireProfile, AdmireProfile,
		readNews, ReadNews,
		viewCalendar, ViewCalendar,
		openSettings, OpenSettings,
	}

	return (
	<Layout ui={globalUI}>
		<Center h='100%'>
			<ProfileCard ui={globalUI} data={dossier.info} avatars={broadcast.avatars} />
			<NewsCard ui={globalUI} articles={broadcast.news} />
			<CalendarCard ui={globalUI} />
			<SettingsCard ui={globalUI} data={dossier.info} playlists={broadcast.playlists} />
      	</Center>
	</Layout>
	);
}