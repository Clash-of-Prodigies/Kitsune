import { Group, Paper, Text, ActionIcon, Avatar } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import IconOrImage from './IconMap';

export default function ResourceBar({ resources = {}}) {
	return (
	<Paper p="xs" radius="lg" shadow="sm" withBorder style={{
		backgroundColor: '#fdf2c2', borderColor: '#ffc107', overflowX: 'auto',
	}}>
		<Group justify='space-evenly'>
			{resources.map((res, index) => (
				<Group gap='xs' key={index} onClick={res.action} style={{ cursor: 'pointer'}}>
					{res.title === 'avatar' ? <Avatar>{IconOrImage(res.icon)}</Avatar> : IconOrImage(res.icon, 20)}
					<Text fw={700} size="sm">{res.label && typeof res.label === 'string' ? res.label : res.label.toLocaleString()}</Text>
					{res.title !== 'avatar' && res.title !== 'settings' &&
						<ActionIcon variant="light" color="yellow" size="sm"><IconPlus size={14} /></ActionIcon>}
        		</Group>
        	))}
      	</Group>
    </Paper>
	);
}
