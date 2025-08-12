import { useState, useEffect, } from 'react';
import { Box, Group, Text, Paper, Button, Avatar, Image, Title, Tooltip, } from '@mantine/core';
import { Badge, Input, ScrollArea, ActionIcon, Stack, } from '@mantine/core';
import { IconShoppingCart, IconSearch, IconPlus, IconInfoCircleFilled } from '@tabler/icons-react';
import IconOrImage from '../components/IconMap';
import RightDrawer from '../components/RightShopDrawer';
import LeftDrawer from '../components/LeftShopDrawer';

function TallCard ({ ui = {}, item = {} })  {
	const addToCart = (item) => {
		ui.setCart((prev) => {
			const map = new Map(prev.map(it => [it.id, { ...it }]));
			const entry = map.get(item.id) || { ...item, qty: 0 };
			entry.qty = (entry.qty || 0) + 1;
			map.set(item.id, entry);
			return Array.from(map.values());
		});
	};

	return (
    <Paper shadow="sm" radius="md" p="md" withBorder w={160}>
      	<Box ta="center" mb="sm">
        	<ActionIcon color="blue" size={64} radius="xl" m={'auto'}>{IconOrImage(item.icon)}</ActionIcon>
      	</Box>
      	<Text fw={700} size="sm" ta="center" truncate w={'100%'}>{item.name}</Text>
      	<Text size="xs" ta="center" c="dimmed">
			{Object.keys(item.price).length > 0 ?
			`${Object.entries(item.price).map(([currency, amount]) => `${amount} ${currency}`).join(", ")}`
			:'Free'}
		</Text>
		<Group display={'flex'} justify='space-between' mt={'sm'}>
			<Tooltip label={item.description}><IconInfoCircleFilled color='#228be6'/></Tooltip>
      		<Button p={0} h={'max-content'} onClick={() => addToCart(item)} ><IconPlus /></Button>
		</Group>
    </Paper>
	);
}

function Collections({ ui = {}, items = [] }) {
	return (
	items.map((item, i) => (
	<Stack gap={0} key={i} id={item.category} className='section'>
		<Title fw={800} mb="xs">{item.category}</Title>
		{item.collections.map((collection, i2) => (
			<Paper p="md" radius="md" shadow="xs" withBorder mb="md" key={i2}>
          		<Text fw={800} mb="xs">{collection.title}</Text>
				<Text size='xs' mb="xs" c={'dimmed'}>{collection.subtitle}</Text>
				<ScrollArea style={{ width: '100%' }}>
  					<Group gap="md" m={'auto'} style={{ display: 'flex', flexWrap: 'nowrap', width: 'max-content' }}>
    				{collection.products.map((p, i) => (
      					<TallCard item={p} key={i} ui={ui} />
    				))}
  					</Group>
				</ScrollArea>
        	</Paper>
		))}
	</Stack>
	)));
}

export default function Shop({ ui = {}, items = {}, dossier = {}, pages = [] }) {
	const [cart, setCart] = useState([]);
	const [leftDrawer, OpenLeftDrawer] = useState(false);
	const [rightDrawer, OpenRightDrawer] = useState(false);
	const [category, setCategory] = useState('Me');

	useEffect(() => {
		const options = { rootMargin: '0px', threshold: 0.5 };
		let timerId = null;

  		const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => {
      		if (entry.isIntersecting) {
				clearTimeout(timerId); timerId = setTimeout(() => {
					setCategory(entry.target.id);
				}, 500);
			}
		});
		}, options);

  		document.querySelectorAll('.section').forEach((section) => observer.observe(section));
		return () => { clearTimeout(timerId); observer.disconnect(); };
	}, []);


	useEffect(() => {
		document.getElementById(category).scrollIntoView({behavior: 'smooth'})
	}, [category])

	const localUI = {
		...ui,
		cart, setCart,
		leftDrawer, OpenLeftDrawer,
		rightDrawer, OpenRightDrawer,
		category, setCategory,
	}

	const categories = items.map((item) => item.category)
  	return (
    <Box pos={'relative'}>
		<ActionIcon variant="filled" size={'xl'} color='green' pos={'absolute'} bottom={45} right={15}
		radius={'xl'} onClick={() => OpenRightDrawer(true)} style={{ zIndex: 2}}>
            <Badge size='xs' color="transparent" c='white' pos="absolute" top={0} style={{
				zIndex: 3
			}}>{cart.length}</Badge>
            <IconShoppingCart size={20} />
        </ActionIcon>
		{/* Title Bar */}
      	<Group justify="space-between" p="md" bg="gray.0" style={{
			borderBottom: '1px solid #ccc',
			overflow: 'hidden',
		}}>
			<Group gap={1} onClick={() => OpenLeftDrawer(true)} style={{ cursor: 'pointer'}}>
				<ActionIcon variant="transparent"><Image src={'http://localhost:5000/media/dark.png'}/></ActionIcon>
        		<Text fw={900} size="lg">Prodigy</Text>
			</Group>
			<Input rightSection={<IconSearch size={16} />} placeholder="Search items..." w={'30vw'} />
			<Group gap={'xs'} onClick={() => {}} style={{ cursor: 'pointer'}}>
				<Avatar>{IconOrImage(dossier.avatar)}</Avatar> {/*IconOrImage(data.avatar, 20)*/}
				<Text fw={700} size="sm">{dossier.name || 'Sign In'}</Text>
			</Group>
      	</Group>

      	{/* Menu Bar */}
      	<Group p="xs" bg="gray.1" wrap="wrap" justify="space-between" gap={0}>
        {categories.slice(0, 5).map((cat, i) => (
			<Button key={i} size="xs" variant={category === cat ? 'filled' : 'light'}
            onClick={() => setCategory(cat)}>
            	{cat}
          	</Button>
        ))}
      	</Group>

      	<ScrollArea h="calc(100vh - 140px)" p="md" pos={'relative'}>
			<Collections items={items} ui={localUI} />
      	</ScrollArea>

      	{/* Left Drawer */}
		<LeftDrawer ui={localUI} categories={categories} pages={pages} dossier={dossier} />

      	{/* Right Drawer - Cart */}
		<RightDrawer ui={localUI} />
    </Box>
	);
}
