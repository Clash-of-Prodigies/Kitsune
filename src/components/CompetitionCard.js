import { Modal, Group, ActionIcon, Paper, Avatar, Text, Stack, Tabs, Box, ScrollArea, SegmentedControl } from '@mantine/core'
import IconOrImage from './IconMap';
import { useState, useMemo } from 'react';
import { IconAward, IconPhoto, IconUser } from '@tabler/icons-react';
import MatchRow from './Matches';

function Leaderboard({ players = [] }) {
    return (
    <>
        {players.map((player, index) => (
        <Paper key={index} shadow="xs" radius="md" p="sm" mt="xs" withBorder style={{
            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
            <Group>
                <Avatar radius="xl" color="blue" size="md">{IconOrImage(player.avatar)}</Avatar>
                <Box><Text fw={500}>{player.name}</Text></Box>
            </Group>
            <Text fw={600}>{player.score}</Text>
        </Paper>
        ))}
    </>
    );
}

function Matches({ matches = [], onWatch }) {
    function dayKey(d) {
        const date = new Date(d);
        return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }

    const [filter, setFilter] = useState('all');
    
    const filtered = useMemo(() => {
        const cleanedMatches = matches.filter((obj) => Object.keys(obj).length !== 0)
        if (filter === 'all') return cleanedMatches;
        return cleanedMatches.filter((m) => {
            const status = m.live ? "live" : m.score.length > 0 ? "finished": "upcoming"
            return filter === status ? m : null});
    }, [matches, filter]);
    
    const byDay = useMemo(() => {
        return filtered.reduce((acc, m) => {
            const k = dayKey(m.datetime); (acc[k] ||= []).push(m); return acc;
        }, {});
    }, [filtered]);
    
    const dayOrder = Object.keys(byDay).sort((a, b) => new Date(a) - new Date(b));

    return (
    <Stack gap="sm">
    <SegmentedControl value={filter} onChange={setFilter}
        data={[
            { label: 'All', value: 'all' },
            { label: 'Live', value: 'live' },
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Finished', value: 'finished' },
    ]} />

        <Stack>
        {dayOrder.map((day) => (
            <Box key={day}>
            {/* sticky day header */}
                <Box px="sm" py={6} mb="xs" style={{
                    position: 'sticky', top: 0,
                    zIndex: 1, background: 'linear-gradient(to bottom, #e9f3ff, #d7e8ff)',
                    borderRadius: 8, boxShadow: '0 1px 0 rgba(0,0,0,.05)',
                }}>
                    <Text fw={800}>{day}</Text>
                </Box>

                <Stack gap="sm">
                {byDay[day].map((m, i) => (
                    <MatchRow key={i} m={m} onWatch={onWatch} />
                ))}
                </Stack>
            </Box>
            ))}
        </Stack>
    </Stack>
    );
}


function Competition({ ui = {} }) {
    const data = ui.viewCompetition;

    return ( data.rankings &&
    <Modal opened={Object.keys(data).length > 0} onClose={() => ui.ViewCompetition(true)}
    radius="xl" padding={0} size="sm" centered withCloseButton={false} overlayProps={{ opacity: '0.6' }}>
        <Paper shadow="lg" radius="xl" w='100%' m='auto' p="md" withBorder style={{
            background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)', border: '3px solid #1a629cff'
        }}>
            <Group position="apart" mb="md">
                <Group>
                    <Avatar src="/avatar.png" size="lg" radius="xl">{IconOrImage(data.icon)}</Avatar>
                    <Stack spacing={0} gap={0}>
                        <Text fw={700} size="lg">{data.name}</Text>
                        <Text size="sm" c="dimmed">{data.type}</Text>
                    </Stack>
                </Group>
            </Group>
                
            <Box><Tabs defaultValue="Matches" mt="md">
                <Tabs.List>
                    <Tabs.Tab value="Standings" icon={<IconPhoto size={16} />}>Standings</Tabs.Tab>
                    <Tabs.Tab value="Matches" icon={<IconUser size={16} />}>Matches</Tabs.Tab>
                    <Tabs.Tab value="Description" icon={<IconAward size={16} />}>Description</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Matches" p={0} pt="md">
                    <ScrollArea h={300} scrollbars="y" type="never">
                        <Matches matches={data.matches} />
                    </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="Standings" pt="md">
                    <ScrollArea h={300} scrollbars="y" type="never">
                        <Leaderboard players={data.rankings.table} />
                    </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="Description" pt="md">
                    {/* Render your badges here */}
                    <ScrollArea h={300} scrollbars="y" type="never">
                        <Text>{data.description}</Text>
                    </ScrollArea>
                </Tabs.Panel>
            </Tabs></Box>
        </Paper>
    </Modal>
    );
}

export default function CompetitionCard({ ui = {} }) {
    const competitions = ui.spectateEvents;
    const [viewCompetition, ViewCompetition] = useState({});

    const localUI = {
        ...ui,
        viewCompetition, ViewCompetition
    }

    return (
    <>
    <Modal radius="xl" size="xl" centered opened={competitions.length > 0}
    withCloseButton={false} onClose={() => ui.SpectateEvents([])} overlayProps={{ opacity: '0.6' }} styles={{
        content: {
            backgroundImage: 'url(http://localhost:5000/media/dark.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
    }}>
            <Group justify='space-evenly' mb={'xl'} mt={'xl'}>
                {competitions.map((competition, index) => (
                    <ActionIcon variant="filled" title={competition.name} radius={'xl'} size={'input-xl'} key={index}
                    onClick={() => ViewCompetition(competition)}>
                        {IconOrImage(competition.icon, 100)}
                    </ActionIcon>
                ))}
            </Group>
    </Modal>
    <Competition ui={localUI} />
    </>
    );
}