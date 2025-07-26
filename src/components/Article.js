import { Modal, Text, Paper, Button, Stack, Image } from '@mantine/core';

export default function Article({ ui = {} }) {
    return (
    <Modal centered withCloseButton={false} radius="xl" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.article !== null} onClose={() => ui.ReadArticle(null)}
    >
        <Paper p="md" radius="xl" style={{ backgroundColor: '#d3eaff', width: '100%' }}>
            <Stack spacing="sm">
                <Text align="center" size="xl" weight={700}>{ui.article?.title ?? 'News Title'}</Text>
                <Text align="center" size="sm" c="dimmed">{ui.article?.description ?? "Here's the news description."}</Text>
                <Image radius="md" fit="cover" alt={ui.article?.title}
                src={ui.article?.imageUrl ?? '/images/default-news.png'}
                />
                <Button fullWidth radius="xl" mt="sm">{ui.article?.ctaText ?? 'Play now'}</Button>
            </Stack>
        </Paper>
    </Modal>
    );
}
