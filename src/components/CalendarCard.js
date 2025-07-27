import { Card, Grid, Text, Title, Stack, Center, ScrollArea, Modal, Paper, } from '@mantine/core';
import { IconCoin, IconFlame, IconKey, IconBox, IconGift } from '@tabler/icons-react';

const days = [
  { date: 'Jul 1', label: '1,000', icon: <IconCoin size={28} /> },
  { date: 'Jul 2', label: '300', icon: <IconCoin size={28} /> },
  { date: 'Jul 3', label: '1', icon: <IconFlame size={28} /> },
  { date: 'Jul 4', label: '200', icon: <IconCoin size={28} /> },
  { date: 'Jul 5', label: '', icon: <IconBox size={28} /> },
  { date: 'Jul 6', label: '5', icon: <IconFlame size={28} /> },
  { date: 'Jul 7', label: '300', icon: <IconCoin size={28} /> },
  { date: 'Jul 8', label: '', icon: <IconBox size={28} /> },
  { date: 'Jul 9', label: '', icon: <IconKey size={28} /> },
  { date: 'Jul 10', label: '', icon: <IconKey size={28} /> },
  { date: 'Jul 11', label: '300', icon: <IconCoin size={28} /> },
  { date: 'Jul 12', label: '500', icon: <IconCoin size={28} /> },
  { date: 'Jul 13', label: '2', icon: <IconFlame size={28} /> },
  { date: 'Jul 14', label: '3', icon: <IconGift size={28} /> },
  { date: 'Jul 15', locked: true },
  { date: 'Jul 16', locked: true },
  { date: 'Jul 17', locked: true },
  { date: 'Jul 18', locked: true },
  { date: 'Jul 19', locked: true },
  { date: 'Jul 20', locked: true },
];

function CalendarDay({day = {}}) {
	return (
	<Card h={120} shadow="sm" radius="md" p="sm" style={{
		opacity: day.locked ? 0.5 : 1, background: day.locked ? '#e0e0e0' : '#fff5db',
	}}>
		<Stack align="center">
            <Text size="xs" c="dimmed">{day.date}</Text>
            {day.locked ? (<IconBox size={28} stroke={1.5} />) : (
				<>{day.icon}<Text size="sm" weight={700}>{day.label}</Text></>
			)}
        </Stack>
    </Card>
	);
}

export default function CalendarCard({ ui = {} }) {
	return (
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.viewCalendar} onClose={() => ui.ViewCalendar(false)}>
		<Paper shadow="md" radius="xs" p="xs" w='100%' style={{ backgroundColor: '#96cbfdff', }}>
			<Center>
				<Title c='#f8fdffff' size="xl" ff='sans-serif' fw={900} style={{
            		textShadow:
            			`0px 2px 0px #070707ff,
            			0px 4px 0px #2b2b2cff`,
					}}>Timeline</Title>
        	</Center>
        	<Text align="center" c='#080aa0ff' size="xs" mb="sm" fw={900}>
				Learn from the Past, Focus on Today, Prepare for your Future
			</Text>
			<ScrollArea p="md" h={400} scrollbars="y" bdrs={12} style={{ backgroundColor: '#d3eaff', }}>
          		<Grid gutter="sm">
            		{days.map((d, i) => (
              			<Grid.Col span={4} key={i}>
							<CalendarDay day={d}/>
              			</Grid.Col>
            		))}
          		</Grid>
      		</ScrollArea>
    	</Paper>
    </Modal>
	);
}
