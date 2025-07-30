import { Modal, Stack, Paper, Text, Box, Group, Badge, ScrollArea, Center, Title } from '@mantine/core';
import { IconClockHour4, } from '@tabler/icons-react';
import { useState, } from 'react';
import Article from './Article';
import iconMap from './IconMap';

function NewsArticle({ui = {}, article={}}) {
    return (
    <Box key={article.id} display='flex' mt='xs' mb='xs' bdrs={10} p={3}
    onClick={() => {article.unread = false; ui.ReadArticle(article)}}  style={{
        backgroundColor: '#f8fdffff', cursor: 'pointer',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow:
        `inset 0 -2px 0 #ffffff,
        0 2px 4px rgba(0, 0, 0, 0.15)`,
    }}>
        <Stack p='md' w='100%' bdrs={10} pos='relative' style={{ backgroundColor: '#c4e1fcff', }}>
            <Group spacing="sm">
                {typeof article.icon === 'string' && iconMap[article.icon] ? 
                 (() => {
                    const IconComponent = iconMap[article.icon];
                    return IconComponent ? <IconComponent size={24} /> : null;
                })()
                : article.icon}
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

function News({ui = {}, articles = []}) {
    return (
    <Paper p="xs" radius="lg" w='100%' style={{
        background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
        border: '3px solid #1a629cff',
    }}>
        <Center><Title order={3} style={{ textShadow: '1px 1px #3772ff' }}>What's New?</Title></Center>
        <ScrollArea p="md" h={400} bdrs={12} scrollbars="y" style={{ backgroundColor: '#d3eaff', }}>
            {articles.map((article) => (<NewsArticle ui={ui} article={article} key={article.id}/>))}
        </ScrollArea>
    </Paper>
    );
}

export default function NewsCard({ ui = {}, articles = [] }) {
    const [article, ReadArticle] = useState(null);

    const localUI = {
        ...ui,
        article, ReadArticle,
    };
    
    return (
    <>
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.readNews} onClose={() => ui.ReadNews(false)}>
        <News ui={localUI} articles={articles} />
    </Modal>
    <Article ui={localUI} />
    </>
    );
}
