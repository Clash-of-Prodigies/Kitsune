import { Group, Paper, Text, Badge, Stack, ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconUsersGroup, IconHome, IconMessages} from '@tabler/icons-react';

const navButtons = [
  { icon: <IconHome size={24} />, label: 'Home', color: 'purple' },
  { icon: <IconUsersGroup size={24} />, label: 'Team'},
  { icon: <IconShoppingCart size={24} />, label: 'Shop', badge: 1 },
  { icon: <IconMessages size={24} />, label: 'Chat', badge: 10 },
];

export default function BottomNav() {
	return (
	<Paper p="xs" radius="lg" shadow="sm" withBorder style={{
		backgroundColor: '#fffbe6', borderColor: '#ffc107'
	}}>
		<Group position="apart" justify='space-evenly'>
			{navButtons.map((btn, i) => (
				<Stack spacing={2} align="center" gap={0} key={i} style={{ cursor: 'pointer' }}>
					<ActionIcon variant="transparent" size="xl" w='100%' h='100%' c={btn.color || 'black'}>
						{btn.badge > 0 && (
							<Badge color="red" variant="filled" size="xs" pos='absolute' top={0} right={0}
							style={{ zIndex: 2 }}>{btn.badge}</Badge>
            			)}
            			{btn.icon}
        			</ActionIcon>
        			<Text size="xs" fw={600} c={btn.color}>{btn.label}</Text>
      			</Stack>
      		))}
    	</Group>
  	</Paper>
	);
}
