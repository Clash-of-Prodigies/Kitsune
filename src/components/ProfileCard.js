import { Paper, Text, Avatar, Group, Stack, Grid, Center, Divider, Modal, Badge, Box, rem, ActionIcon } from '@mantine/core';
import { IconPencil, IconUpload, IconTarget, IconSkateboard } from '@tabler/icons-react';
import { IconAward, IconMapPin } from '@tabler/icons-react';

function ProfileCardTool({icon, action}) {
	return (
		<ActionIcon radius={'xl'} onClick={action}>{icon}</ActionIcon>
	);
}

function ProfileCardBar({title, value, icon}) {
    return (
        <Box style={{
            background: 'linear-gradient(to bottom, #e0edff, #c5dfff)',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.25)',
            textAlign: 'center',
            padding: '0.25rem',
            position: 'relative'
        }}
        >
            <ActionIcon variant='transparent' size={'xl'} radius={'xl'} style={{
                position: 'absolute',
                left: -10,
                top: 0,
                }}>{icon}</ActionIcon>
            <Text size="sm" fw={500} c="#1a629cff" style={{ textTransform: 'uppercase' }}>{title}</Text>
            <Text size={value.size} fw={700} fs={value.style || 'normal'} style={{
                color: 'white',
                textShadow: `
                -1px -1px 0 #2e2e2e,
                1px -1px 0 #2e2e2e,
                -1px  1px 0 #2e2e2e,
                1px  1px 0 #2e2e2e
                `,
            }}
            >
            {value.text}
            </Text>
        </Box>
    );
}

function Profile({ ui }) {
  return (
    <Paper
    shadow="lg"
    radius="xl"
    p="md"
    withBorder
    style={{
        width: '100%',
        maxWidth: rem(400),
        margin: 'auto',
        background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
        border: '3px solid #1a629cff'
    }}
    >
        <Group position="apart" mb="md">
            <Group>
                <Stack spacing={6} align="center">
                    <ProfileCardTool icon={<IconPencil size={20}/>} action={() => {ui.UpdateProfileName(true)}} />
                    <ProfileCardTool icon={<IconUpload size={20}/>} action={() => {ui.ShareProfile(true)}} />
                </Stack>
                <Avatar src="/avatar.png" size="lg" radius="xl" />
                <Stack spacing={0} gap={0}>
                    <Text fw={700} size="lg">Oracle</Text>
                    <Text size="sm" c="dimmed">The Aesir</Text>
                </Stack>
            </Group>
        </Group>

        <ProfileCardBar title={'Bio'} value={{'text': 'For Fortune and Glory...', 'size': '0.75rem', 'style': 'italic'}} />
		<Grid gutter="sm" mb="md" mt='md'>
			{/* Left: Character Placeholder */}
			<Grid.Col span={5}>
				<Center style={{ height: '100%' }}>
					<Box
        			style={{
          			width: 100,
          			height: 140,
          			borderRadius: 12,
          			background: 'linear-gradient(to bottom, #ffe68c, #ffd34d)',
          			boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        			}}
      				>
						{/* You can later add a <Character3D /> here */}
      				</Box>
    			</Center>
  			</Grid.Col>
			
		{/* Right: Stats */}
  		<Grid.Col span={7}>
    		<Stack spacing="xs">
      			<ProfileCardBar title="destinations" value={{ text: '7/459', size: '1rem' }} icon={<IconTarget size={18} />} />
      			<ProfileCardBar title="trophies" value={{ text: '7/446', size: '1rem' }} icon={<IconSkateboard size={18} />} />
      			<ProfileCardBar title="achievements" value={{ text: '3/27', size: '1rem' }} icon={<IconAward size={18} />} />
      			<ProfileCardBar title="titles" value={{ text: '21/81', size: '1rem' }} icon={<IconMapPin size={18} />} />
    		</Stack>
  		</Grid.Col>
	</Grid>

      {/* LEVEL 4: Badges */}
      <Divider my="xs" />
      <Group position="apart" mt="xs">
        <Badge color="orange" leftSection="🥉" size="lg">x1</Badge>
        <Badge color="gray" leftSection="🥈" size="lg">x6</Badge>
        <Badge color="blue" leftSection="🥇" size="lg">x0</Badge>
        <Badge color="violet" leftSection="💎" size="lg">x5</Badge>
        <Badge color="dark" leftSection="🎩" size="lg">x0</Badge>
      </Group>
    </Paper>
  );
}

export default function ProfileCard({ ui={} }) {
	return (
	<Modal
        opened={ui.profileCardToggle}
        onClose={() => ui.ProfileCardToggle(false)}
        centered
        withCloseButton={false}
        radius="xl"
        padding={0}
        size="auto"
		overlayProps={{opacity: '0.6'}}
    >
		<Profile ui={ui}/>
	</Modal>
	);
}