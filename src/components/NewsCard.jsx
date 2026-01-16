import { useState, useEffect, } from 'react';
import axios from 'axios';

import { Modal, Stack, Paper, Text, Box, Group, } from '@mantine/core';
import { ScrollArea, Center, Title, Image, Button } from '@mantine/core';
import { IconClockHour4, IconTrash, } from '@tabler/icons-react';

import IconOrImage from './IconMap';
import { API_URL } from '../utils.js';

function formatSentDate(dateString) {
    const sentDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - sentDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (diffHours < 24) {
        return `${diffHours} hr${diffHours !== 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
        return `${diffDays} dy${diffDays !== 1 ? 's' : ''}`;
    } else if (diffWeeks < 4) {
        return `${diffWeeks} wk${diffWeeks !== 1 ? 's' : ''}`;
    } else if (diffMonths < 12) {
        return `${diffMonths} mth${diffMonths !== 1 ? 's' : ''}`;
    } else {
        return `${diffYears} yr${diffYears !== 1 ? 's' : ''}`;
    }
}

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
    <Box key={article.id} display='flex' mt='xs' mb='xs' bdrs={10} p={3} style={{
        backgroundColor: '#f8fdffff', cursor: 'pointer',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow:
        `inset 0 -2px 0 #ffffff,
        0 2px 4px rgba(0, 0, 0, 0.15)`,
    }}>
        <Stack p='md' w='100%' bdrs={10} style={{ backgroundColor: '#c4e1fcff', }}>
            <Group justify="space-between" wrap="nowrap" align="center" w="100%">
                <Group wrap="nowrap" gap="xs" style={{ flex: 1, minWidth: 0, maxWidth: '75%' }}
                onClick={() => ui.ReadArticle(article)}>
                    {IconOrImage(article.icon)}
                    <Text c="#290dddff" ff="sans-serif" fw={900} truncate style={{flex: 1, minWidth: 0 }}>
                        {article.title}
                    </Text>
                </Group>

                <Group w='30%' wrap="nowrap" gap="xs" align="center" style={{ flexShrink: 0 }}>
                    <Button variant="transparent" p={2} color="blue" size="xs" onClick={() => {}}>
                        <IconTrash />
                    </Button>

                    <Group m="0 auto" bdrs={10} px={5} wrap="nowrap" style={{
                        backgroundColor: "purple", gap: 3
                    }}>
                        <Text c='white' size="xs" fw={600}>{formatSentDate(article.sentDate)}</Text>
                    </Group>
                </Group>
            </Group>
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
        const NEWS_API_URL = new URL('news', API_URL);
        Promise.all([
                axios.get(NEWS_API_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }),
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
