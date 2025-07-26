import { Modal, Stack, Paper, Text, Box, Group, Badge, } from '@mantine/core';
import { IconClockHour4, IconGift, IconNews } from '@tabler/icons-react';
import { useState } from 'react';
import Article from './Article';
import imagi from '../media/dark.png'

const articles = [
    {
        id: 1,
        title: "Floor is Lava",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageUrl: imagi,
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
        {
        id: 6,
        title: "Welcome!",
        icon: <IconGift size={24} />,
        timeLeft: "4d 17h",
        unread: false,
    },
];

function NewsArticle({ui = {}, article={}}) {
    return (
    <Box key={article.id} onClick={() => ui.ReadArticle(article)} style={{
        backgroundColor: '#f8fdffff', borderRadius: 10, cursor: 'pointer', padding: 3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: `
        inset 0 -2px 0 #ffffff,
        0 2px 4px rgba(0, 0, 0, 0.15)
        `,
        }}
    >
        <Stack p='md' style={{ backgroundColor: '#c4e1fcff', width: '100%', borderRadius: 10, position: 'relative'}}>
            <Group spacing="sm">
                {article.icon}
                <Text c='#290dddff' style={{ fontFamily: 'sans-serif', fontWeight: 900, }}>{article.title}</Text>
            </Group>
            <Group c='white' style={{
                position: 'absolute', bottom: 3, right: 5,
                backgroundColor: 'purple', borderRadius: 10, paddingLeft: 5, paddingRight: 5,
                '--group-gap': '3px',
            }}
            >
                <IconClockHour4 size={16} />
                <Text size="xs" style={{ fontWeight: 700}}>{article.timeLeft}</Text>
            </Group>
            <Badge color="red" variant="filled" size="xs" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 2,
                border: '2px solid white',
                boxShadow: 
                `0 0 4px #070707ff,
                inset 0 0 1px #070707ff
                `,
            }}
            display={article.unread ? "default" : "none"}>
            </Badge>
        </Stack>
    </Box>
    );
}

function News({ui = {}}) {
    return (
    <Paper p="xs" radius="xs" style={{ backgroundColor: '#96cbfdff', width: '100%', }}>
        <Text align="center" c='#f8fdffff' size="xl" mb="sm" style={{
            fontFamily: 'sans-serif',
            fontWeight: 900,
            textShadow:
            `0px 2px 0px #070707ff,
            0px 4px 0px #2b2b2cff
            `,
        }}>What's New?</Text>
        <Stack spacing="sm" p="xs" style={{
            backgroundColor: '#d3eaff',
            borderRadius: 12,
			maxHeight: 400,
			overflowY: 'auto',
			overflowX: 'hidden',
			paddingRight: 4,
		}}
        >
            {articles.map((article) => (<NewsArticle ui={ui} article={article} key={article.id}/>))}
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
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.readNews} onClose={() => ui.ReadNews(false)}
    >
        <News ui={uiState} />
    </Modal>
    <Article ui={uiState} />
    </>
    );
}
