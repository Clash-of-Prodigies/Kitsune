import { Modal, Stack, Paper, Text, Box, Group, } from '@mantine/core';
import { IconClockHour4, IconGift, IconNews } from '@tabler/icons-react';
import { useState } from 'react';
import Article from './News';

const articles = [
    {
        id: 1,
        title: "Floor is Lava",
        icon: <IconNews size={24} />,
        timeLeft: "7d 17h",
        unread: true,
    },
    {
        id: 2,
        title: "Plant Invasion",
        icon: <IconNews size={24} />,
        timeLeft: "3d 17h",
        unread: true,
    },
    {
        id: 3,
        title: "Season Challenge",
        icon: <IconNews size={24} />,
        timeLeft: "2d 17h",
        unread: true,
    },
    {
        id: 4,
        title: "Season Hunt Rewards",
        icon: <IconNews size={24} />,
        timeLeft: "7d 17h",
        unread: true,
    },
    {
        id: 5,
        title: "Welcome!",
        icon: <IconGift size={24} />,
        timeLeft: "4d 17h",
        unread: false,
    },
];

function News({ui = {}}) {
    return (
    <Paper p="md" radius="xl" style={{ backgroundColor: '#d3eaff', width: '100%' }}>
        <Text align="center" size="xl" weight={700} mb="sm">What's New?</Text>
        <Stack spacing="sm">
            {articles.map((article) => (
                <Box key={article.id} p="xs" onClick={() => ui.ReadArticle(article)} style={{
                    backgroundColor: '#ecf4ff', borderRadius: 10, cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
                >
                    <Group spacing="sm">
                        {article.icon}
                        <Text weight={600}>{article.title}</Text>
                    </Group>
                    <Group spacing={4}>
                        <IconClockHour4 size={16} />
                        <Text size="sm">{article.timeLeft}</Text>
                    </Group>
                </Box>
            ))}
        </Stack>
    </Paper>
    );
}

export default function NewsCard({ ui={} }) {
    const [article, ReadArticle] = useState(null);

    const uiState = {
        ...ui,
        article,
        ReadArticle,
    };
    
    return (
    <>
    <Modal centered withCloseButton={false} radius="xl" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.readNews} onClose={() => ui.ReadNews(false)}
    >
        <News ui={uiState} />
    </Modal>
    <Article ui={uiState} />
    </>
    );
}
