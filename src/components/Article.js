import { Modal, Text, Paper, Button, Stack, Image } from '@mantine/core';

export default function Article({ ui = {} }) {
    return (
    <Modal centered withCloseButton={false} radius="xl" padding={0} overlayProps={{ opacity: 0.6 }} size="sm"
    opened={ui.article !== null} onClose={() => ui.ReadArticle(null)}
    >
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
