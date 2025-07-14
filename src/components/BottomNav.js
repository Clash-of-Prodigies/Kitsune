// src/components/BottomNav.jsx
import { Group, Paper, Text, Badge, Stack, ActionIcon } from '@mantine/core';
import {
  IconMessages,
  IconShoppingCart,
  IconWorld,
  IconUsersGroup,
} from '@tabler/icons-react';

const navButtons = [
  { icon: <IconUsersGroup size={24} />, label: 'Team', badge: 1 },
  { icon: <IconMessages size={24} />, label: 'Chat', badge: 1 },
  { icon: <IconShoppingCart size={24} />, label: 'Shop', badge: 1 },
  { icon: <IconWorld size={24} />, label: 'Events', badge: 5 },
];

export default function BottomNav() {
  return (
  <Paper
  p="xs"
  radius="lg"
  shadow="sm"
  withBorder
  style={{ backgroundColor: '#fffbe6', borderColor: '#ffc107' }}
  >
  <Group position="apart" justify='space-evenly'>
    {navButtons.map((btn, index) => (
      <Stack spacing={2} align="center" key={index}  style={{ gap: '0', cursor: 'pointer' }}>
        <ActionIcon variant="transparent" size="xl" style={{ width: '100%', height: '100%', color: 'black' }}>
          {btn.badge > 0 && (
            <Badge
            color="red"
            variant="filled"
            size="xs"
            style={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
            >
              {btn.badge}
              </Badge>
            )}
            {btn.icon}
        </ActionIcon>
        <Text size="xs" fw={600}>{btn.label}</Text>
      </Stack>
      ))}
    </Group>
  </Paper>
  );
}
