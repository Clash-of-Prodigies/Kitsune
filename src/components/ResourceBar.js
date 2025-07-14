// src/components/ResourceBar.jsx
import { Group, Paper, Text, ActionIcon } from '@mantine/core';
import { IconKey, IconCoin, IconFlame, IconStar, IconPlus } from '@tabler/icons-react';

const resources = [
  { icon: IconKey, amount: 75 },
  { icon: IconCoin, amount: 653278 },
  { icon: IconFlame, amount: 93 },
  { icon: IconStar, amount: 29 },
];

export default function ResourceBar() {
  return (
    <Paper
      p="xs"
      radius="lg"
      shadow="sm"
      withBorder
      style={{
        backgroundColor: '#fdf2c2',
        borderColor: '#ffc107',
        overflowX: 'auto',
      }}
    >
      <Group spacing="md" justify='space-evenly'>
        {resources.map((res, index) => (
          <Group spacing={4} key={index}>
            <res.icon width={24} height={24} alt="icon" />
            <Text fw={700} size="sm">{res.amount.toLocaleString()}</Text>
            <ActionIcon variant="light" color="yellow" size="sm">
              <IconPlus size={14} />
            </ActionIcon>
          </Group>
        ))}
      </Group>
    </Paper>
  );
}
