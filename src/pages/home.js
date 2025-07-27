import { useState } from 'react';
import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import { Box, Container, Center, Stack } from '@mantine/core';
import { IconNews, IconCalendar, IconTournament, IconHours24, IconSparkles, IconSettings  } from '@tabler/icons-react';
import { IconHome, IconUser, IconTrophy, IconBarbell } from '@tabler/icons-react';
import SidebarButton from '../components/SideBarButton';
import ProfileCard from '../components/ProfileCard';
import NewsCard from '../components/NewsCard';
import CalendarCard from '../components/CalendarCard';

function LeftSidebar({ ui }) {
	return (
    <Stack spacing="sm" pos='absolute' left={10}>
		<SidebarButton icon={<IconUser />} action={() => ui.ProfileCardToggle(true)} />
		<SidebarButton icon={<IconSettings />} action={() => {}}/>
		<SidebarButton icon={<IconNews />} action={() => ui.ReadNews(true)} />
		<SidebarButton icon={<IconCalendar />} action={() => ui.ViewCalendar(true)} />
    </Stack>
	);
}

function RightSidebar({ ui }) {
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
	const [profileCardToggle, ProfileCardToggle] = useState(false);
	const [readNews, ReadNews] = useState(false)
	const [viewCalendar, ViewCalendar] = useState(false)

	const uiState = {
		profileCardToggle,
		ProfileCardToggle,
		readNews,
		ReadNews,
		viewCalendar,
		ViewCalendar,
	}

	return (
	<Layout ui={uiState}>
		<Center h='100%'>
			<ProfileCard ui={uiState} />
			<NewsCard ui={uiState} />
			<CalendarCard ui={uiState} />
      	</Center>
	</Layout>
	);
}