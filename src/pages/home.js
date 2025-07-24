import { useState } from 'react';
import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import { Box, Container, Center, Stack } from '@mantine/core';
import { IconNews, IconCalendar, IconTournament, IconHours24, IconMessages, IconSparkles  } from '@tabler/icons-react';
import { IconHome, IconUser, IconTrophy, IconBarbell } from '@tabler/icons-react';
import SidebarButton from '../components/SideBarButton';
import ProfileCard from '../components/ProfileCard';
import News from '../components/NewsVendor';

function LeftSidebar({ ui }) {
  return (
    <Stack spacing="sm" style={{ position: 'absolute', left: 10 }}>
		<SidebarButton icon={<IconUser />} action={() => ui.ProfileCardToggle(true)}/>
		<SidebarButton icon={<IconMessages />} badge={10} />
		<SidebarButton icon={<IconNews />} action={() => ui.ReadNews(true)}/>
		<SidebarButton icon={<IconCalendar />} />
    </Stack>
  );
}

function RightSidebar({ ui }) {
	return (
    <Stack spacing="sm" style={{ position: 'absolute', right: 10 }}>
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
    <Container
	fluid
    px={0}
    style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#e0f0ff',
        display: 'flex',
        flexDirection: 'column',
    }}
    >
		{/* Top bar */}
		<Box p="sm">
			<ResourceBar />
		</Box>
		
		{/* Main content */}
		<Box style={{ flex: 1, overflowY: 'auto', position: 'relative' }} px="md" pt="sm">
			<LeftSidebar ui={ui}/>
			<RightSidebar ui={ui}/>{children}
		</Box>

      {/* Bottom nav */}
      <Box p="sm">
		<BottomNav />
      </Box>
    </Container>
  );
}

export default function Home() {
	const [profileCardToggle, ProfileCardToggle] = useState(false);
	const [readNews, ReadNews] = useState(false)

	const uiState = {
		profileCardToggle,
		ProfileCardToggle,
		readNews,
		ReadNews,
	}

	return (
	<Layout ui={uiState}>
		<Center style={{ height: '100%' }}>
			<ProfileCard ui={uiState} />
			<News ui={uiState} />
      	</Center>
	</Layout>
  );
}