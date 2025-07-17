import { Modal, Paper, Group, Avatar, Text, Grid, Button, Box, Center, } from '@mantine/core';
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
];

export default function EditProfile({ ui={} }) {
  const [selected, setSelected] = useState(portraits[0]);

  return (
    <Modal
      opened={ui.updateProfileName}
      onClose={ui.UpdateProfileName}
      title={null}
      centered
      withCloseButton={false}
      radius="xl"
      padding={0}
      size="auto"
      overlayProps={{ opacity: 0.6 }}
    >
      <Paper
        p="md"
        style={{
          background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
          borderRadius: 20,
          width: '90%',
          maxWidth: 400,
        }}
      >
        {/* Header: avatar + name */}
        <Group mb="sm">
          <Avatar color="blue" radius="xl">
            {selected.icon}
          </Avatar>
          <Text fw={700} size="lg">Oracle</Text>
        </Group>

        {/* Portrait Grid */}
        <Grid gutter="xs" mb="sm">
          {portraits.map((p, i) => (
            <Grid.Col span={3} key={i}>
              <Box
                onClick={() => !p.locked && setSelected(p)}
                style={{
                  cursor: p.locked ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  backgroundColor: '#f4f9ff',
                  borderRadius: 12,
                  border: selected.label === p.label ? '2px solid green' : '2px solid transparent',
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
                  <IconCheck size={16} style={{ position: 'absolute', top: 5, left: 5, color: 'green' }} />
                )}
              </Box>
            </Grid.Col>
          ))}
        </Grid>

        {/* Selected name (readonly for now) */}
        <Text align="center" fw={600} mb="xs">
          {selected.label}
        </Text>

        {/* Save Button */}
        <Center>
          <Button color="lime" radius="xl" size="md" fw={700}>
            SAVE
          </Button>
        </Center>
      </Paper>
    </Modal>
  );
}
