import { Modal, Stack, Paper, Text, Box, Group, Badge, ScrollArea, Center, Title, Image, Button } from '@mantine/core';
import { IconClockHour4, } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import IconOrImage from './IconMap';
import axios from 'axios';

function Article({ ui = {} }) {
    return (
    <Modal centered withCloseButton={false} radius="xl" padding={0} overlayProps={{ opacity: 0.6 }} size="sm"
    opened={Object.keys(ui.article).length > 0} onClose={() => ui.ReadArticle({})}>
        <Paper p="xs" radius="xs" style={{ backgroundColor: '#96cbfdff', width: '100%', }}>
            <Text align="center" c='#f8fdffff' size="xl" mb="sm" ff='sans-serif' fw={900} style={{
                textShadow: '1px 1px #3772ff',
            }}>{ui.article?.title ?? 'News Title'}</Text>

            <Text align="center" c='#080aa0ff' size="sm" mb="sm" style={{ fontWeight: 900, }}>
                {ui.article?.description ?? "Here's the news description."}
            </Text>
            <Stack spacing="sm" p="xs" style={{ backgroundColor: '#d3eaff', borderRadius: 12, }}>
                <Image radius="md" fit="contain" alt={ui.article?.title} width={100} height={250} src={ui.article?.imageUrl ?? null} />
                <Button radius="md" mt="sm" ml="auto" mr="auto" style={{ width: 'fit-content'}}>{ui.article?.ctaText ?? 'Play now'}</Button>
            </Stack>
        </Paper>
    </Modal>
    );
}

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
                {IconOrImage(article.icon)}
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

export default function NewsCard({ ui = {} }) {
    const [article, ReadArticle] = useState({});
    const [articles, GetArticles] = useState([]);
    const [loading, Load] = useState(true);
    const [error, Spit] = useState(null);

    useEffect(() => {
        if (!loading) return;
        Promise.all([
                axios.get('http://localhost:5000/news'),
        ])
        .then((res) => {GetArticles(res[0].data); console.log(res);})
        .catch((err) => Spit(err))
        .finally(() => Load(false));
    }, [loading]);

    const localUI = {
        ...ui,
        article, ReadArticle,
        loading, Load,
        error, Spit,
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
