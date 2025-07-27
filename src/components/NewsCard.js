import { Modal, Stack, Paper, Text, Box, Group, Badge, ScrollArea, } from '@mantine/core';
import { IconClockHour4, IconGift, IconNews } from '@tabler/icons-react';
import { useState } from 'react';
import Article from './Article';
import imagi from '../media/dark.png'

const articles = [
    {
        id: 1,
        title: "Floor is Lava",
        description: "Lore ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    <Box key={article.id} display='flex' mt='xs' mb='xs' bdrs={10} p={3}
    onClick={() => ui.ReadArticle(article)}  style={{
        backgroundColor: '#f8fdffff', cursor: 'pointer',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow:
        `inset 0 -2px 0 #ffffff,
        0 2px 4px rgba(0, 0, 0, 0.15)`,
    }}
    >
        <Stack p='md' w='100%' bdrs={10} pos='relative' style={{ backgroundColor: '#c4e1fcff', }}>
            <Group spacing="sm">
                {article.icon}
                <Text c='#290dddff' ff='sans-serif' fw={900}>{article.title}</Text>
            </Group>
            <Group c='white' pos='absolute' bottom={3} right={5} bdrs={10} pl={5} pr={5} style={{
                backgroundColor: 'purple', '--group-gap': '3px',
            }}
            >
                <IconClockHour4 size={16} />
                <Text size="xs" fw={700}>{article.timeLeft}</Text>
            </Group>
            <Badge color="red" variant="filled" size="xs" pos='absolute' top={0} right={0}
            display={article.unread ? "default" : "none"} style={{
                zIndex: 2, border: '2px solid white',
                boxShadow: 
                `0 0 4px #070707ff,
                inset 0 0 1px #070707ff`,
            }}>
            </Badge>
        </Stack>
    </Box>
    );
}

function News({ui = {}}) {
    return (
    <Paper p="xs" radius="lg" w='100%' style={{ backgroundColor: '#96cbfdff', border: '3px solid #1a629cff'}}>
        <Text align="center" c='#f8fdffff' size="xl" mb="sm" ff='sans-serif' fw={900} style={{
            textShadow:
            `0px 2px 0px #070707ff,
            0px 4px 0px #2b2b2cff
            `,
        }}>What's New?</Text>
        <ScrollArea p="md" h={400} bdrs={12} scrollbars="y" style={{ backgroundColor: '#d3eaff', }}>
            {articles.map((article) => (<NewsArticle ui={ui} article={article} key={article.id}/>))}
        </ScrollArea>
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
    opened={ui.readNews} onClose={() => ui.ReadNews(false)}>
        <News ui={uiState} />
    </Modal>
    <Article ui={uiState} />
    </>
    );
}
