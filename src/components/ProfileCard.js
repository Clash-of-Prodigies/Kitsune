import { Paper, Text, Avatar, Group, Stack, Grid, Center, Divider, Modal, Box, ActionIcon } from '@mantine/core';
import { IconPencil, IconUpload, IconTarget, IconSkateboard, } from '@tabler/icons-react';
import { IconAward, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';
import EditProfile from './EditProfile';
import iconMap from './IconMap';

function ProfileCardTool({icon, action}) {
	return (
		<ActionIcon radius={'xl'} onClick={action}>{icon}</ActionIcon>
	);
}

function Medal({ image, size = 32, frameColor = '#a2c4ff' }) {
    return (
    <Box bdrs='50%' style={{
        width: size, height: size, overflow: 'hidden', transform: 'scale(0.85)', backgroundColor: 'white',
        border: `4px solid ${frameColor}`, boxShadow: `0 0 8px ${frameColor}`,
    }}>
        {typeof image === 'string' && iconMap[image] ? 
            (() => {
                const IconComponent = iconMap[image];
                return IconComponent ? <IconComponent size={24} /> : null;
            })()
            : image}
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

function Profile({ ui = {}, data = {} }) {
  return (
    <Paper shadow="lg" radius="xl" w='100%' m='auto' p="md" withBorder style={{
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
                <Avatar src="/avatar.png" size="lg" radius="xl">
                {typeof data.avatar === 'string' && iconMap[data.avatar] ? 
                    (() => {
                        const IconComponent = iconMap[data.avatar];
                        return IconComponent ? <IconComponent size={24} /> : null;
                    })()
                    : data.avatar
                }
                </Avatar>
                <Stack spacing={0} gap={0}>
                    <Text fw={700} size="lg">{data.name}</Text>
                    <Text size="sm" c="dimmed">{data.team}</Text>
                </Stack>
            </Group>
        </Group>

        <ProfileCardBar title={'Bio'} value={{'text': data.bio, 'size': '0.75rem', 'style': 'italic'}} />
		<Grid gutter="sm" mb="md" mt='md'>

			{/* Character Placeholder */}
			<Grid.Col span={5}>
				<Center style={{ height: '100%' }}>
					<Box style={{
          			    width: 100, height: 140, borderRadius: 12,
          			    background: 'linear-gradient(to bottom, #ffe68c, #ffd34d)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        			}}>
						{/* add a <Character3D /> here */}
      				</Box>
    			</Center>
  			</Grid.Col>
            
            {/* Stats */}
  		    <Grid.Col span={7}>
    		    <Stack spacing="xs">
      			    <ProfileCardBar title="destinations" value={{
                        text: `${data.destinations[0]}/${data.destinations[1]}`, size: '1rem'}}
                        icon={<IconTarget size={18} />} />
      			    <ProfileCardBar title="trophies" value={{
                        text: `${data.trophies[0]}/${data.trophies[1]}`, size: '1rem' }}
                        icon={<IconSkateboard size={18} />} />
      			    <ProfileCardBar title="achievements" value={{
                        text: `${data.achievements[0]}/${data.achievements[1]}`, size: '1rem' }}
                        icon={<IconAward size={18} />} />
      			    <ProfileCardBar title="titles" value={{
                        text: `${data.titles[0]}/${data.titles[1]}`, size: '1rem' }}
                        icon={<IconMapPin size={18} />} />
    		    </Stack>
  		    </Grid.Col>
	    </Grid>
        
        {/* Badges */}
        <Divider my="xs" />
        <ProfileCardBar title={'Accolades'}>
            <Box style={{ width: 320 }} ml='auto' mr='auto'>
                <Group style={{'--group-justify': 'space-evenly'}}>
                    {data.accolades.map((m, i) => <Box key={i}><Medal image={m} label={m} /></Box>)}
                </Group>
            </Box>
        </ProfileCardBar>
    </Paper>
  );
}

export default function ProfileCard({ ui = {}, data = {}, avatars = [] }) {
    const [updateProfileName, UpdateProfileName] = useState(false)
    const [shareProfile, ShareProfile] = useState(false)

    const localUI = {
        ...ui,
        updateProfileName, UpdateProfileName,
		shareProfile, ShareProfile,
    }

	return (
    <>
    <Modal radius="xl" padding={0} size="sm" centered opened={ui.admireProfile} withCloseButton={false}
    onClose={() => ui.AdmireProfile(false)} overlayProps={{ opacity: '0.6' }}>
		<Profile ui={localUI} data={data}/>
	</Modal>
    <EditProfile ui={localUI} data={data} avatars={avatars}/>
    </>
	);
}