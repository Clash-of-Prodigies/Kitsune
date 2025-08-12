import { useEffect, useMemo, useState } from 'react';
import { Drawer, Stack, Group, Paper, Text, TextInput, ActionIcon, Badge, Button, Collapse, } from '@mantine/core';
import { ScrollArea, Divider, Avatar, NavLink, Switch, Box, Tooltip, } from '@mantine/core';
import { IconSearch, IconChevronRight, IconChevronDown, IconSun, IconMoon } from '@tabler/icons-react'; 
import { IconLogin, IconLogout, } from '@tabler/icons-react';
import IconOrImage from '../components/IconMap';

function Dropdown({ children, title, dependency }) {
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		if (dependency && dependency.length > 0) setOpened(true);
		else setOpened(false);
	}, [dependency])

  	return (
	<>
	<Button variant="transparent" fw={800} size="sm" c="dimmed" px="xs" mt="sm" mb={4}
    onClick={() => setOpened((o) => !o)} rightSection={opened ? <IconChevronDown /> : <IconChevronRight />} >
        {title}
    </Button>

    <Collapse in={opened}>
        <Stack gap={2} px="xs" pb="sm">
			{children}
        </Stack>
    </Collapse>
    </>
	);
}

export default function LeftDrawer({ ui = {}, categories = [], pages = [], dossier = {}, }) {
	const onSignOut = () => {}; const onSignIn = () => {};
  	const [query, setQuery] = useState('');

  	const filtered = useMemo(() => {
		if (!query.trim()) return categories;
		const q = query.toLowerCase(); return categories.filter((c) => c.toLowerCase().includes(q));
  	}, [categories, query]);

  	const bgGradient = 'linear-gradient(180deg, #eaf3ff 0%, #f4f7ff 100%)';
  	const headerGradient = 'linear-gradient(180deg,#dff0ff,#e9edff)';

  	return (
    <Drawer opened={ui.leftDrawer} onClose={ui.OpenLeftDrawer} pos="left" size={325} withCloseButton={false}
    styles={{
		content: { background: bgGradient, borderRight: '1px solid #dbe7ff',},
    }}>
      	{/* Profile / Header */}
      	<Paper radius="md" p="sm" withBorder mb="md" style={{ background: headerGradient }}>
        	<Group justify="space-between" align="center">
          		<Group gap="md">
            		<Avatar radius="xl" color="blue">{IconOrImage(dossier.avatar)}</Avatar>
            		<Box>
              			<Text fw={800}>{dossier?.name || 'Guest'}</Text>
              			<Group gap={6}>
            				<Badge size="md" color="yellow" leftSection={IconOrImage("Coin", 15)}>
              				{dossier?.coins.toLocaleString()}
            				</Badge>
            				<Badge size="md" color="pink" leftSection={IconOrImage("Ticket", 15)}>
              				{dossier?.tickets.toLocaleString()}
            				</Badge>
              			</Group>
            		</Box>
          		</Group>

          	{dossier?.name ? (
            	<Tooltip label="Sign out">
					<ActionIcon variant="subtle" color="red" onClick={onSignOut}>
						<IconLogout size={18} />
					</ActionIcon>
            	</Tooltip>
          	) : (
            	<Tooltip label="Sign in">
              		<ActionIcon variant="subtle" onClick={onSignIn}>
                		<IconLogin size={18} />
              		</ActionIcon>
            	</Tooltip>
          	)}
        	</Group>
      	</Paper>

      	{/* Search + Quick filters */}
      	<Stack gap="xs" mb="sm" px="xs">
        	<TextInput placeholder="Search categories…" value={query} radius="md"
			leftSection={<IconSearch size={16} />} onChange={(e) => setQuery(e.currentTarget.value)} />
      	</Stack>

      	{/* Scrollable content area */}
      	<Stack gap="sm" style={{ height: 'calc(100vh - 260px)' }}>
			<ScrollArea style={{ flex: 1 }} type="auto" scrollbars="y">

          	{/* Categories */}
			<Dropdown title={'Categories'} dependency={query}>
			{filtered.map((cat, i) => (
				<Button key={`${cat}-${i}`} variant="subtle" justify="space-between"
            	onClick={() => { ui.setCategory(cat); ui.OpenLeftDrawer(false)?.(); }}
            	leftSection={IconOrImage(cat.icon)} rightSection={<IconChevronRight size={14} />} >
    				{cat}
            	</Button>
			))}
			</Dropdown>

          	<Divider my="md" />

          	{/* Links / Navigation */}
			<Dropdown title={'Navigation'}>
			{pages?.map((p, idx) => (
				<NavLink label={p.label} component='a' href={p.link} variant="light" bdrs={8}
            	key={`${p.label}-${idx}`} leftSection={IconOrImage(p.icon)} />
			))}
			</Dropdown>

          	<Divider my="md" />

          	{/* Preferences */}
			<Dropdown title={'Preferences'}>
			{[{
				label: dossier.theme === "light" ? "Light Mode": "Dark Mode",
				offLabel: dossier.theme === "light" ? <IconSun size={18} /> : <IconMoon />,
				onLabel: dossier.theme === "dark" ? <IconSun /> : <IconMoon size={18} />,
				action: (e) => ui.onToggleTheme?.(e.currentTarget.checked),
			}].map((p, i) => (
				<Group key={i} justify="space-between">
              		<Text size="sm">{p.label}</Text>
              		<Switch onLabel={p.onLabel} offLabel={p.offLabel} color={'gray'} onChange={p.action} />
            	</Group>
			))}
			</Dropdown>

          	<Divider my="md" />

          	{/* Help */}
          	<Dropdown title={'Need Help?'}>
			{[{label: "Support", link: "/#support", icon: "Headset", },
			{label: "FAQ", link: "/#faq", icon: "Help", }
			].map((media, i) => (
				<NavLink label={media.label} component='a' href={media.link} variant="light" bdrs={8}
            	key={`${media.label}-${i}`} leftSection={IconOrImage(media.icon, 20)} />
			))}
			</Dropdown>
        </ScrollArea></Stack>
    </Drawer>
	);
}
