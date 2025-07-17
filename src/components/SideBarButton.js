import { Paper, ActionIcon, Badge } from '@mantine/core';

export default function SidebarButton({ icon, badge, action }) {
    return (
    <Paper
      shadow="sm"
      radius="lg"
      withBorder
      style={{ position: 'relative', width: 50, height: 50 }}
      onClick={action}
    >
        {badge && (
            <Badge
            color="red"
            variant="filled"
            size="xs"
            style={{ position: 'absolute', top: -5, right: -5 }}
            >{badge}
            </Badge>
        )}
        <ActionIcon variant="transparent" size="xl" style={{ width: '100%', height: '100%' }}>{icon}
        </ActionIcon>
    </Paper>
  );
}
