import { Paper, Text, Avatar, Group, Stack, Grid, Center, Divider, Modal, Box, rem, ActionIcon } from '@mantine/core';
import { IconPencil, IconUpload, IconTarget, IconSkateboard } from '@tabler/icons-react';
import { IconAward, IconMapPin } from '@tabler/icons-react';

function ProfileCardTool({icon, action}) {
	return (
		<ActionIcon radius={'xl'} onClick={action}>{icon}</ActionIcon>
	);
}

function Medal({ image, size = 32, frameColor = '#a2c4ff' }) {
    return (
    <Box style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `4px solid ${frameColor}`,
        boxShadow: `0 0 8px ${frameColor}`,
        transform: 'scale(0.85)',
        backgroundColor: 'white',
    }}
    >
        {image}
    </Box>
  );
}

function ProfileCardBar({children, title, value={}, icon}) {
    return (
        <Box style={{
            background: 'linear-gradient(to bottom, #e0edff, #c5dfff)',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.25)',
            textAlign: 'center',
            padding: '0.25rem',
            position: 'relative',
            }}
        >
            <ActionIcon variant='transparent' size={'xl'} radius={'xl'} style={{position: 'absolute', left: -10, top: 0,}}>{icon}</ActionIcon>
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
            {children}
        </Box>
    );
}

const medals = [
    {medal: <Medal image={<IconAward />} />, label: 'Award'},
    {medal: <Medal image={<IconTarget />} />, label: 'Target'},
    {medal: <Medal image={<IconSkateboard />} />, label: 'Skateboard'},
    {medal: <Medal image={<IconPencil />} />, label: 'Pencil'},
    {medal: <Medal image={<IconUpload />} />, label: 'Upload'},
]

function Profile({ ui }) {
  return (
    <Paper shadow="lg" radius="xl" p="md" withBorder style={{
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

			{/* Character Placeholder */}
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
						{/* add a <Character3D /> here */}
      				</Box>
    			</Center>
  			</Grid.Col>
            
            {/* Stats */}
  		    <Grid.Col span={7}>
    		    <Stack spacing="xs">
      			    <ProfileCardBar title="destinations" value={{ text: '7/459', size: '1rem' }} icon={<IconTarget size={18} />} />
      			    <ProfileCardBar title="trophies" value={{ text: '7/446', size: '1rem' }} icon={<IconSkateboard size={18} />} />
      			    <ProfileCardBar title="achievements" value={{ text: '3/27', size: '1rem' }} icon={<IconAward size={18} />} />
      			    <ProfileCardBar title="titles" value={{ text: '21/81', size: '1rem' }} icon={<IconMapPin size={18} />} />
    		    </Stack>
  		    </Grid.Col>
	    </Grid>
        
        {/* Badges */}
        <Divider my="xs" />
        <ProfileCardBar title={'Accolades'}>
            <Box style={{ width: 320}} >
                <Group style={{'--group-justify': 'space-evenly'}}>
                    {medals.map((m, i) => (
                        <Box key={i}>{m.medal}</Box>
                    ))}
                </Group>
            </Box>
        </ProfileCardBar>
    </Paper>
  );
}

export default function ProfileCard({ ui={} }) {
	return (
        <Modal radius="xl" padding={0} size="auto" centered opened={ui.profileCardToggle} withCloseButton={false}
        onClose={() => ui.ProfileCardToggle(false)}
	    overlayProps={{ opacity: '0.6' }}
        >
		    <Profile ui={ui} />
	    </Modal>
	);
}