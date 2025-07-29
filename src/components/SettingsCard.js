import { Paper, Stack, Title, Center, Button, Group, Divider, Text, Slider, Box, Modal, } from '@mantine/core';
import { IconDeviceGamepad, IconMusic, IconVolume, } from '@tabler/icons-react';
import { IconBrandFacebook, IconWorld, IconCheck, } from '@tabler/icons-react';
import { useState } from 'react';

function Setting({icon = {}, title = "", subtitle = "", action = () => {}, slider = null }) {
    return (
    <Group style={{ cursor: 'pointer'}}>
        <Group gap="xs" onClick={action}>
            {icon}
            <Box>
                <Text fw={600} size="sm">{title}</Text>
                <Text size="xs" c="dimmed">{subtitle}</Text>
            </Box>
        </Group>
        {typeof slider === 'function' && (
            <Slider size="sm" color="blue" defaultValue={50} w={180} onChangeEnd={slider} />
        )}
    </Group>
    );
}

function Settings({ ui = {} }) {
    return (
    <Paper shadow="lg" radius="lg" w='100%' m='auto' p="xs" withBorder style={{
            background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
            border: '3px solid #1a629cff'
    }}>
        {/* Title */}
        <Center><Title order={3} style={{ textShadow: '1px 1px #3772ff' }}>Settings</Title></Center>
        <Stack gap="xs" p="sm" bdrs="md" style={{ backgroundColor: '#d3eaff',}}>

            {/* Connect Section */}
            <Stack gap={4} p="xs" bdrs="lg" style={{background: '#f9f5fcff'}}>
                <Text align="center" c='#080aa0ff' size="sm" fw={800}>CONNECT</Text>
                <Text align="center" size="xs" c="dimmed">Unlock access to restricted features with your Prodigy ID</Text>
                
                <Group grow spacing="xs">
                    <Paper withBorder p="sm" radius="lg" style={{ backgroundColor: '#e4f7d3' }}>
                        <Stack gap="xs" align="center">
                            <Group spacing={6}>
                                <IconDeviceGamepad size={20} />
                                <Text size="sm" fw={600}>Play Games</Text>
                                <IconCheck size={18} color="green" />
                            </Group>
                            <Button size="xs" radius="md" variant="default">Disconnect</Button>
                        </Stack>
                    </Paper>
                    
                    <Paper withBorder p="sm" radius="lg" style={{ backgroundColor: '#e4f7d3' }}>
                        <Stack gap="xs" align="center">
                            <Group spacing={6}>
                                <IconBrandFacebook size={20} />
                                <Text size="sm" fw={600}>Facebook</Text>
                                <IconCheck size={18} color="green" />
                            </Group>
                            <Button size="xs" radius="md" variant="default">Disconnect</Button>
                        </Stack>
                    </Paper>
                </Group>
            </Stack>

            {/* Audio Settings */}
            <Stack>
                <Setting icon={<IconMusic size={20} />} title="Boombox" subtitle="Default" action={() => {}} />
                <Setting icon={<IconVolume size={20} />} title='Music' action={() => {}} slider={(val) => alert(`Volume changed to ${val}`)} />
            </Stack>

            <Divider />

            {/* Region & Language */}
            <Stack>
                <Setting icon={<IconWorld size={20} />} title='Theme' subtitle='Light' />
            </Stack>

            <Divider />

            {/* App Version */}
            <Center><Text size="xs" c="dimmed">3.48.5~82956</Text></Center>
        </Stack>
    </Paper>
    );
}

export default function SettingsCard({ ui = {} }) {
    const [openPlaylists, OpenPlaylists] = useState(false);
    const [muteMusic, MuteMusic] = useState(true);
    const [viewThemes, ViewThemes] = useState(false);
    
    const localUI = {
        ...ui,
        openPlaylists, OpenPlaylists,
        muteMusic, MuteMusic,
        viewThemes, ViewThemes,
    };

    return (
    <>
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.openSettings} onClose={() => ui.OpenSettings(false)}>
        <Settings ui={localUI} />
    </Modal>
    </>
    );
}
