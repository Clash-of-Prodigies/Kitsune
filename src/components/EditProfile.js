import { Modal, Paper, Group, Avatar, Text, Grid, Button, Box, Center, TextInput, Stack, Textarea } from '@mantine/core';
import { IconUser, IconRobot, IconAlien, IconSpy, IconStar, IconMoodHappy, IconFaceIdError, } from '@tabler/icons-react';
import { IconFaceId, IconUserCircle, IconUserSearch, IconUserEdit, IconLock, IconCheck, } from '@tabler/icons-react';
import { useState } from 'react';

const portraits = [
  { icon: <IconUser />, label: 'Jake' },
  { icon: <IconMoodHappy />, label: 'Tricky' },
  { icon: <IconRobot />, label: 'Robo' },
  { icon: <IconSpy />, label: 'Yutani' },
  { icon: <IconAlien />, label: 'Alien' },
  { icon: <IconFaceId />, label: 'Tagbot' },
  { icon: <IconUserSearch />, label: 'Lucia' },
  { icon: <IconFaceIdError />, label: 'Fresh' },
  { icon: <IconUserEdit />, label: 'Frank' },
  { icon: <IconUserCircle />, label: 'Zoe' },
  { icon: <IconStar />, label: 'King' },
  { icon: <IconLock />, label: 'Locked', locked: true },
{ icon: <IconUser />, label: 'Jack' },
  { icon: <IconMoodHappy />, label: 'Trick' },
  { icon: <IconRobot />, label: 'Rob' },
  { icon: <IconSpy />, label: 'Yutan' },
  { icon: <IconAlien />, label: 'Alie' },
  { icon: <IconFaceId />, label: 'Tagbo' },
  { icon: <IconUserSearch />, label: 'Luci' },
  { icon: <IconFaceIdError />, label: 'Fres' },
  { icon: <IconUserEdit />, label: 'Fran' },
  { icon: <IconUserCircle />, label: 'Zo' },
  { icon: <IconStar />, label: 'Kin' },
  { icon: <IconLock />, label: 'Lock', locked: true },
];

function handleSubmit(e, ui={}) {
	e.preventDefault();

	//alert(`${ui.username} and ${ui.selected.label} and ${ui.bio}`)
	fetch('/api/update-profile', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: ui.username,
			avatar: ui.selected.label,
			bio: ui.bio,
		}),
	}).then(res => {
		if (res.ok) {
			ui.ui.UpdateProfileName(false);
		}
	});
}


export default function EditProfile({ ui={} }) {
	const [selected, setSelected] = useState(portraits[0]);
	const [username, setUsername] = useState('Oracle');
	const [bio, setBio] = useState('For Fortune and Glory');
	
	const uiState = {
		ui,
		selected,
		setSelected,
		username,
		setUsername,
		bio,
		setBio,
	}

	return (
    <Modal
      opened={ui.updateProfileName}
      onClose={ui.UpdateProfileName}
      centered
      withCloseButton={false}
      radius="xl"
      padding={0}
      overlayProps={{ opacity: 0.6 }}
    >
		<Paper
        p="md"
        style={{
			background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
			borderRadius: 20,
          	width: '100%',
        }}
		>
			<form onSubmit={(e) => handleSubmit(e, ui=uiState)}>
				<Stack>
					{/* Header: avatar + name */}
					<Group mb="sm">
						<Avatar color="blue" radius="xl">{selected.icon}</Avatar>
						<TextInput value={username} variant="filled" radius="md" size="md"
  						onChange={(event) => setUsername(event.currentTarget.value)}
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
					<Box style={{
						maxHeight: 200,
						overflowY: 'auto',
						overflowX: 'hidden',
						paddingRight: 4,
						}}
						sx={{
						'&::-webkit-scrollbar': {width: '8px',},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#888',
							borderRadius: '8px',
						},
						'&::-webkit-scrollbar-track': {backgroundColor: 'transparent',},
						}}
					>
						<Grid gutter="xs" mb="sm">
							{portraits.map((p, i) => (
								<Grid.Col span={3} key={i}>
									<Box onClick={() => !p.locked && setSelected(p)} style={{
										cursor: p.locked ? 'not-allowed' : 'pointer',
										position: 'relative',
										backgroundColor: '#f4f9ff',
										borderRadius: 12,
										border: selected.label === p.label ? '2px solid green': '2px solid transparent',
										padding: 10,
										}}
									>
										<Center>{p.icon}</Center>
										{p.locked && (
											<Center style={{ position: 'absolute', top: 0, right: 0 }}>
												<IconLock size={14} />
											</Center>
										)}
										{selected.label === p.label && (
											<IconCheck size={16} style={{
                								position: 'absolute',
                								top: 5,
                								left: 5,
                								color: 'green',
              									}}
            								/>
										)}
									</Box>
								</Grid.Col>
							))}
						</Grid>
					</Box>

        			{/* Selected name (readonly for now) */}
        			<Text align="center" fw={600} mb="xs">{selected.label}</Text>

        			{/* Save Button */}
        			<Center><Button type='submit' color="lime" radius="xl" size="md" fw={700}>SAVE</Button></Center>
				</Stack>
			</form>
		</Paper>
    </Modal>
  );
}
