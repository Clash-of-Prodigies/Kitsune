import { Group,  Paper, Text, Badge, Button, Avatar, Divider } from '@mantine/core';
import { IconPlayerPlay, IconBellRinging, IconClock } from '@tabler/icons-react';
import IconOrImage from './IconMap';

export default function MatchRow({ m, onWatch }) {
	const isLive = m.live;
	const isUpcoming = m.score.length <= 0;
	const isFinished = m.score.length > 0 && !m.live;

  	return (
    <Paper withBorder radius="md" p="sm" shadow="xs">
      	<Group justify="space-between" align="center">
        	<Group gap="sm">
          	{isLive && <Badge color="red" leftSection={<IconBellRinging size={12} />}>Live</Badge>}
          	{isUpcoming && <Badge color="yellow" leftSection={<IconClock size={12} />}>Upcoming</Badge>}
          	{isFinished && <Badge color="gray">Finished</Badge>}
          	<Text fw={600} c="dimmed">{m.round}</Text>
        	</Group>
        	<Text size="sm" c="dimmed">
				{new Date(m.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        	</Text>
      	</Group>

      	<Divider my="xs" />

      	<Group justify="space-between" wrap="nowrap">
        	<Group gap={4} wrap="nowrap">
          		<Avatar radius="xl" size="md" color={m.home.theme}>{IconOrImage(m.home.logo)}</Avatar>
          		<Text fw={700} size='sm'>{m.home.name}</Text>
        	</Group>

        	<Group gap={8} wrap="nowrap">
          		{(m.score.length > 0 && (<Paper p="xs" radius="sm" withBorder ta='center'>
            		<Text fw={800} size="sm">{String(m.score[0]) || '-'}</Text>
          		</Paper>)) || (<Text fw={800} size="sm">{'-'}</Text>)}
          		<Text fw={900}>:</Text>
          		{(m.score.length > 0 && (<Paper p="xs" radius="sm" withBorder ta='center'>
            		<Text fw={800} size="sm">{String(m.score[1]) || '-'}</Text>
          		</Paper>)) || (<Text fw={800} size="sm">{'-'}</Text>)}
        	</Group>

        	<Group gap={4} wrap="nowrap">
          		<Text fw={700} ta="right" size='sm'>{m.away.name}</Text>
          		<Avatar radius="xl" size="md" color={m.away.theme}>{IconOrImage(m.away.logo)}</Avatar>
        	</Group>
      	</Group>

      	<Group mt="sm" justify="flex-end">
        	<Button size="xs" leftSection={<IconPlayerPlay size={14} />} radius="xl"
			variant={isLive ? 'filled' : 'light'} color={isLive ? 'red' : 'blue'} onClick={() => onWatch?.(m)}>
          		{isLive ? 'Watch now' : isUpcoming ? 'Set reminder' : 'Replay'}
        	</Button>
      	</Group>
    </Paper>
	);
}