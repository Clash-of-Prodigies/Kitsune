import { Box, Container, Center, Stack, Paper, ActionIcon, Badge, Group } from '@mantine/core';
import { IconNews, IconCalendar, IconHours24, IconSparkles, IconBuildingCastle, } from '@tabler/icons-react';
import { IconTrophy, IconBarbell, } from '@tabler/icons-react';
import { useEffect, useState, } from 'react';
import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import ProfileCard from '../components/ProfileCard';
import NewsCard from '../components/NewsCard';
import CalendarCard from '../components/CalendarCard';
import SettingsCard from '../components/SettingsCard';
import IconOrImage from '../components/IconMap';
import CompetitionCard from '../components/CompetitionCard';

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

function RightSidebarButton({ ui = {}, icon, badge, childIcons = [], }) {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setExpanded(false);
		}, 8000)
	}, [expanded])

	function ChildIcons({ childIcon }) {
		return (
		<Paper shadow="xs" radius="lg" withBorder bdrs="50%" w={50} h={50} title={childIcon.name}
		onClick={() => ui.SpectateEvents(childIcon.competitions)}>
            <ActionIcon variant="transparent" size="xl" w="100%" h="100%">{IconOrImage(childIcon.icon)}</ActionIcon>
        </Paper>
		);
	}
	
	return (
	<Box h={50} pos="relative">
		<Paper shadow="sm" radius="lg" withBorder bdrs="50%" h="100%" w={50}>
			{badge && (
				<Badge color="red" variant="filled" size="xs" pos="absolute" top={-5} right={-5}>{badge}</Badge>
        	)}
        	<ActionIcon variant="transparent" size="xl" w="100%" h="100%"
			onClick={() => setExpanded((prev) => !prev)} style={{
				cursor: 'pointer', zIndex: 2,
			}}>{icon}</ActionIcon>
      	</Paper>

      	<Group pos="absolute" h={50+5} top={-5/2} justify='space-between' style={{
			width: expanded ? 50 + childIcons.length * 50 : 50, overflow: 'hidden',
			left: expanded ? (childIcons.length > 1 ? 50 + (50  / (childIcons.length - 1)) : 100) : 0,
			transition: 'width 0.3s ease', borderRadius: 12,
        }}>
        	{expanded && (<>{childIcons.map((icon, index) => (<ChildIcons childIcon={icon} key={index} />))}</>)}
      	</Group>
    </Box>
	);
}

function LeftSidebar({ ui = {}, competitions = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' left={10}>
		<RightSidebarButton ui={ui} icon={<IconTrophy />} childIcons={competitions.interhouse} />
		<RightSidebarButton ui={ui} icon={<IconBuildingCastle />} childIcons={competitions.houses} />
		<LeftSidebarButton icon={<IconNews />} action={() => ui.ReadNews(true)} />
		<LeftSidebarButton icon={<IconCalendar />} action={() => ui.ViewCalendar(true)} />
    </Stack>
	);
}

function RightSidebar({ ui = {} }) {
	return (
    <Stack spacing="sm" pos='absolute' right={10}>
		<RightSidebarButton icon={<IconHours24 />}  badge={1} />
		<RightSidebarButton icon={<IconBarbell />} />
		<RightSidebarButton icon={<IconSparkles />} />
    </Stack>
	);
}

function Layout({ children, ui, user = {}, competitions = {} }) {
	const resources = [
		{ title: 'avatar', icon: user.avatar, label: user.name, action: () => ui.AdmireProfile(true) },
		{ icon: 'Coin', label: 653278 },
		{ icon: 'Ticket', label: 75 },
		{ title: 'settings', icon: 'Settings', label: '', action: () => ui.OpenSettings(true) },
	];

	return (
    <Container fluid px={0} h='100vh' display='flex' style={{
        overflow: 'hidden', backgroundColor: '#e0f0ff', flexDirection: 'column',
    }}>
		{/* Top bar */}
		
		<Box p="sm"><ResourceBar resources={resources}/></Box>
		
		{/* Main content */}
		<Box flex={1} pos='relative'  px="md" pt="sm" style={{ overflowY: 'auto',}}>
			<LeftSidebar ui={ui} competitions={competitions} />
			<RightSidebar ui={ui} />
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
	const [spectateEvents, SpectateEvents] = useState([]);

	const globalUI = {
		...ui,
		admireProfile, AdmireProfile,
		readNews, ReadNews,
		viewCalendar, ViewCalendar,
		openSettings, OpenSettings,
		spectateEvents, SpectateEvents,
	}

	return (
	<Layout ui={globalUI} user={dossier.info} competitions={broadcast.events}>
		<Center h='100%'>
			<ProfileCard ui={globalUI} data={dossier.info} avatars={broadcast.avatars} />
			<NewsCard ui={globalUI} articles={broadcast.news} />
			<CalendarCard ui={globalUI} />
			<SettingsCard ui={globalUI} data={dossier.info} playlists={broadcast.playlists} />
			<CompetitionCard ui={globalUI} />
      	</Center>
	</Layout>
	);
}