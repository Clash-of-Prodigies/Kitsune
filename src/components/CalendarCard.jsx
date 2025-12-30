import { Card, Grid, Text, Title, Stack, Center, ScrollArea, Modal, Paper, Group, Button, Box } from '@mantine/core';
import { IconBox, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import IconOrImage from './IconMap';

function generateCalendarData(month, calendar) {
	const year = new Date().getFullYear()
	const daysInMonth = new Date(year, month, 0).getDate();

  	const schedule = [];
	let currentIndex = 0;
	for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
		if (!calendar[currentIndex] || (currentDay !== (calendar[currentIndex]).day)) {
			const date = new Date(year, month, currentDay);
			const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
			schedule.push({ date: formatted, locked: true });
			continue;
		}
		const date = new Date(year, month, currentDay);
		const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
		schedule.push({ date: formatted, icon: calendar[currentIndex].icon, label: calendar[currentIndex].label });
		currentIndex++;
	}
	return schedule;
}

function DayCard({ day = {} }) {
	return (
	<Card h={120} shadow="sm" radius="md" p="sm" style={{
		opacity: day.locked ? 0.5 : 1, background: day.locked ? '#e0e0e0' : '#fff5db',
	}}>
		<Stack align="center">
            <Text size="xs" c="dimmed">{day.date}</Text>
            {day.locked ? (<IconBox size={28} stroke={1.5} />) : (
				<>{IconOrImage(day.icon)}<Text size="sm" weight={700}>{day.label}</Text></>
			)}
        </Stack>
    </Card>
	);
}

function Calendar({ ui = {} }) {
	return (
	<Paper shadow="md" radius="lg" p="xs" w='100%' style={{
		background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)', border: 'solid #1a629cff',
	}}>
		<Center><Title order={3} style={{ textShadow: '1px 1px #3772ff' }}>Timeline</Title></Center>
		<Text align="center" c='#080aa0ff' size="xs" mb="sm" fw={900}>
			Learn from the Past, Focus on Today, Prepare for your Future
		</Text>
		
		<ScrollArea p="md" pt="xs" h={400} scrollbars="y" bdrs={12} style={{ backgroundColor: '#d3eaff', }}>
			<Center pos="sticky" top={0} mb='xs' style={{ backgroundColor: 'transparent', zIndex: 1 }}>
				<Group gap="xs">
					<Button variant='transparent' disabled={ui.epoch < 1} size="compact-sm" p={0}
					onClick={() => ui.SetEpoch(curr => curr - 1)} style={{
						cursor: ui.epoch < 1 ? "not-allowed": "pointer",
					}}>
						<IconArrowLeft />
					</Button>
					<Box><Text fw={700}>{new Date(new Date().getFullYear(), ui.epoch).toLocaleString('en-US', { month: 'long' })}</Text></Box>
					<Button variant='transparent' disabled={ui.epoch > 10} size="compact-sm" p={0}
					onClick={() => ui.SetEpoch(curr => curr + 1)} style={{
						cursor: ui.epoch > 10 ? "not-allowed": "pointer",
					}}>
						<IconArrowRight />
					</Button>
				</Group>
			</Center>
          	<Grid gutter="sm">
            	{generateCalendarData(ui.epoch, ui.events).map((d) => (
              		<Grid.Col span={4} key={parseInt(d.date.split(' ')[1], 10)}>
						<DayCard day={d}/>
              		</Grid.Col>
            	))}
          	</Grid>
      	</ScrollArea>
    </Paper>
	);
}

export default function CalendarCard({ ui = {} }) {
	const [epoch, SetEpoch] = useState(new Date().getMonth())
	const [events, CollectEvents] = useState([])

	useEffect(() => {
		const prev_epoch = epoch;
		fetch(`http://localhost:5000/calendar?month=${epoch + 1}`).then((res) => res.json())
		.then((schedule) => CollectEvents(schedule))
		.catch(() => {if (epoch !== prev_epoch) SetEpoch(prev_epoch);})
	}, [epoch])

	const localUI = {
		...ui,
		epoch, SetEpoch,
		events,
	}
	return (
	<>
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.viewCalendar} onClose={() => ui.ViewCalendar(false)}>
		<Calendar ui={localUI} />
    </Modal>
	</>
	);
}
