import { Modal, Paper, Group, Avatar, Text, Grid, Button, Box, Center, TextInput, Stack, Textarea, ScrollArea } from '@mantine/core';
import { IconLock, IconCheck, } from '@tabler/icons-react';
import { useState, } from 'react';
import IconOrImage from './IconMap';

function handleSubmit(e, ui={}, data={}) {
	e.preventDefault();

	//alert(`${ui.username} and ${ui.avatar} and ${ui.bio}`)
	fetch('http://localhost:5000/update', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: ui.name,
			avatar: ui.avatar,
			bio: ui.bio,
		}),
	}).then(res => {
		if (res.ok) {
			ui.Load(true);
			ui.UpdateProfileName(false);
		}
	}).catch(() => {
		ui.setUsername(data.name);
		ui.setAvatar(data.avatar);
		ui.setBio(data.bio);
	});
}

function Portrait({ avatar = {}, ui = {} }) {
	return (
	<Box p={10} bdrs={12} pos='relative' onClick={() => !avatar.locked && ui.setAvatar(avatar.label)}
	style={{
		cursor: avatar.locked ? 'not-allowed' : 'pointer',
		backgroundColor: '#f4f9ff',
		border: ui.avatar === avatar.label ? '2px solid green': '2px solid transparent',
	}}>
		<Center>{IconOrImage(avatar.label)}</Center>
		{avatar.locked && (
			<Box style={{ position: 'absolute', top: 0, right: 0 }}><IconLock size={14} /></Box>
		)}
		{ui.avatar === avatar.label && (
			<IconCheck size={16} style={{ position: 'absolute', top: 5, left: 5, color: 'green', }} />
		)}
	</Box>
	);
}

export default function EditProfile({ ui = {}, data = {}, avatars = [] }) {
	const [avatar, setAvatar] = useState(data.avatar);
	const [name, setUsername] = useState(data.name);
	const [bio, setBio] = useState(data.bio);
	
	const uiState = {
		...ui,
		avatar, setAvatar,
		name, setUsername,
		bio, setBio,
	}

	return (
    <Modal centered withCloseButton={false} radius="xl" padding={0} overlayProps={{ opacity: 0.6 }} size="sm"
    opened={ui.updateProfileName} onClose={ui.UpdateProfileName}>
		<Paper p="md" bdrs={20} w='100%' style={{
			background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
		}}>
			<form onSubmit={(e) => handleSubmit(e, ui=uiState, data={data})}>
				<Stack>
					{/* Header: avatar + name */}
					<Group mb="sm">
						<Avatar color="blue" radius="xl">{IconOrImage(avatar)}</Avatar>
						<TextInput value={name} variant="filled" radius="md" size="md"
  						onChange={(e) => setUsername(e.currentTarget.value)}
  						styles={{ input: { fontWeight: 700, }, }}
						/>
        			</Group>
					
					{/* ✍️ Bio input */}
  					<Textarea name='bio' value={bio} autosize minRows={2} maxRows={4} maxLength={400}
					variant="filled" radius="md" size="md" placeholder="Describe yourself..."
    				onChange={(e) => setBio(e.currentTarget.value)}
    				styles={{ input: { fontStyle: 'italic', }, }}
  					/>

        			{/* Portrait Grid */}
					<ScrollArea h={200} p="md" scrollbars="y">
						<Grid gutter="xs" mb="sm">
							{avatars.map((avatar, i) => (
								<Grid.Col span={3} key={i}>
									<Portrait avatar={avatar} ui={uiState} />
								</Grid.Col>
							))}
						</Grid>
					</ScrollArea>

        			{/* Selected name (readonly for now) */}
        			<Text align="center" fw={600} mb="xs">{avatar}</Text>

        			{/* Save Button */}
        			<Center>
						<Button type='submit' color="lime" radius="xl" size="md" fw={700}>SAVE</Button>
					</Center>
				</Stack>
			</form>
		</Paper>
	</Modal>
	);
}
