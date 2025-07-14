import ResourceBar from '../components/ResourceBar';
import BottomNav from '../components/BottomNav';
import { Box, Container, Text, Center, Stack } from '@mantine/core';
import { IconSparkles, IconNews, IconCalendar } from '@tabler/icons-react';
import { IconMusic, IconDiscount2, IconTicket, IconUser } from '@tabler/icons-react';
import SidebarButton from '../components/SideBarButton';

function LeftSidebar() {
  return (
    <Stack spacing="sm" style={{ position: 'absolute', top: 80, left: 10 }}>
		<SidebarButton icon={<IconUser />} />
		<SidebarButton icon={<IconSparkles />} />
		<SidebarButton icon={<IconNews />} />
		<SidebarButton icon={<IconCalendar />} />
    </Stack>
  );
}

function RightSidebar() {
	return (
    <Stack spacing="sm" style={{ position: 'absolute', top: 80, right: 10 }}>
		<SidebarButton icon={<IconDiscount2 />} />
		<SidebarButton icon={<IconTicket />} />
		<SidebarButton icon={<IconUser />} />
		<SidebarButton icon={<IconMusic />} badge={1} />
    </Stack>
  );
}

function Layout({ children }) {
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
			<LeftSidebar />
			<RightSidebar />{children}
		</Box>

      {/* Bottom nav */}
      <Box p="sm">
		<BottomNav />
      </Box>
    </Container>
  );
}

export default function Home() {
	return (
	<Layout>
		<Center style={{ height: '100%' }}>
        <Text size="xl" fw={700}>Tap to Play</Text>
      </Center>
	</Layout>
  );
}