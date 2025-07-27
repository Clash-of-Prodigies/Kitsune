import { Card, Grid, Text, Title, Stack, Center, ScrollArea, Modal, Paper, } from '@mantine/core';
import { IconCoin, IconFlame, IconKey, IconBox, IconGift } from '@tabler/icons-react';

const rewards = [
  { day: 'Jul 1', label: '1,000', icon: <IconCoin size={28} /> },
  { day: 'Jul 2', label: '300', icon: <IconCoin size={28} /> },
  { day: 'Jul 3', label: '1', icon: <IconFlame size={28} /> },
  { day: 'Jul 4', label: '200', icon: <IconCoin size={28} /> },
  { day: 'Jul 5', label: '', icon: <IconBox size={28} /> },
  { day: 'Jul 6', label: '5', icon: <IconFlame size={28} /> },
  { day: 'Jul 7', label: '300', icon: <IconCoin size={28} /> },
  { day: 'Jul 8', label: '', icon: <IconBox size={28} /> },
  { day: 'Jul 9', label: '', icon: <IconKey size={28} /> },
  { day: 'Jul 10', label: '', icon: <IconKey size={28} /> },
  { day: 'Jul 11', label: '300', icon: <IconCoin size={28} /> },
  { day: 'Jul 12', label: '500', icon: <IconCoin size={28} /> },
  { day: 'Jul 13', label: '2', icon: <IconFlame size={28} /> },
  { day: 'Jul 14', label: '3', icon: <IconGift size={28} /> },
  { day: 'Jul 15', locked: true },
  { day: 'Jul 16', locked: true },
  { day: 'Jul 17', locked: true },
  { day: 'Jul 18', locked: true },
  { day: 'Jul 19', locked: true },
  { day: 'Jul 20', locked: true },
];

export default function CalendarCard({ ui = {} }) {
	return (
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.viewCalendar} onClose={() => ui.ViewCalendar(false)}>
		<Paper shadow="md" radius="xs" p="xs" style={{ width: '100%', backgroundColor: '#96cbfdff', }}>
			<Center>
				<Title c='#f8fdffff' size="xl" style={{ fontFamily: 'sans-serif', fontWeight: 900,
            		textShadow:
            			`0px 2px 0px #070707ff,
            			0px 4px 0px #2b2b2cff`,
					}}>Timeline</Title>
        	</Center>
        	<Text align="center" c='#080aa0ff' size="sm" mb="sm" style={{ fontWeight: 900, }}>
				Check in daily to get rewards! Claim missed days to catch up.
			</Text>
			<ScrollArea p="md" h={400} scrollbars="y" style={{ backgroundColor: '#d3eaff', borderRadius: 12, }}>
          		<Grid gutter="sm">
            		{rewards.map((r, i) => (
              			<Grid.Col span={4} key={i}>
                			<Card shadow="sm" radius="md" p="sm" style={{
								minHeight: 80, opacity: r.locked ? 0.5 : 1,
                    			background: r.locked ? '#e0e0e0' : '#fff5db',
                  			}}>
                  				<Stack align="center" spacing={4}>
                    				<Text size="xs" c="dimmed">{r.day}</Text>
                    				{r.locked ? (<IconBox size={28} stroke={1.5} />) : (
										<>{r.icon}<Text size="sm" weight={700}>{r.label}</Text></>
									)}
                  				</Stack>
                			</Card>
              			</Grid.Col>
            		))}
          		</Grid>
      		</ScrollArea>
    	</Paper>
    </Modal>
	);
}
