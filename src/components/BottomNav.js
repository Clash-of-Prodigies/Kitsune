// src/components/BottomNav.jsx
import { Group, Paper, Text, Badge, Stack, ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconUsersGroup, IconSettings, IconHome} from '@tabler/icons-react';

const navButtons = [
  { icon: <IconHome size={24} />, label: 'Home', color: 'purple' },
  { icon: <IconUsersGroup size={24} />, label: 'Team'},
  { icon: <IconShoppingCart size={24} />, label: 'Shop', badge: 1 },
  { icon: <IconSettings size={24} />, label: 'Settings' },
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
        <ActionIcon variant="transparent" size="xl" style={{ width: '100%', height: '100%', color: btn.color || 'black' }}>
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
        <Text size="xs" fw={600} c={btn.color}>{btn.label}</Text>
      </Stack>
      ))}
    </Group>
  </Paper>
  );
}
