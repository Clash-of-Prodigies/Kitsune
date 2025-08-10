import { useState, useEffect } from 'react';
import { Box, Group, Text, Paper, Button, Drawer, Avatar, Image, Title, Divider } from '@mantine/core';
import { Badge, Input, ScrollArea, ActionIcon, Stack, } from '@mantine/core';
import { IconShoppingCart, IconSearch } from '@tabler/icons-react';
import IconOrImage from '../components/IconMap';

function TallCard ({ ui = {}, item = {} })  {
	const addToCart = (item) => ui.setCart([...ui.cart, item]);
	return (
    <Paper shadow="sm" radius="md" p="md" withBorder w={160}>
      	<Box ta="center" mb="sm">
        	<Avatar color="blue" size={64} radius="xl">
          	{IconOrImage(item.icon)}
        	</Avatar>
      	</Box>
      	<Text fw={700} size="sm" ta="center">{item.name}</Text>
      	<Text size="xs" ta="center" c="dimmed">{item.price}</Text>
      	<Button fullWidth mt="sm" size="xs" onClick={() => addToCart(item)}>Add to Cart</Button>
    </Paper>
	);
}

function Collections({ ui = {}, items = [] }) {
	const addToCart = (item) => ui.setCart([...ui.cart, item]);
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
      					<TallCard item={p} key={i} addToCart={addToCart} ui={ui} />
    				))}
  					</Group>
				</ScrollArea>
        	</Paper>
		))}
	</Stack>
	)));
}

export default function Shop({ items = {}, dossier = {} }) {
	const [cart, setCart] = useState([]);
	const [leftDrawerOpened, setLeftDrawerOpened] = useState(false);
	const [rightDrawerOpened, setRightDrawerOpened] = useState(false);
	const [category, setCategory] = useState('Me');

	useEffect(() => {
		const options = { rootMargin: '0px', threshold: 0.5, };

    	const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setCategory(entry.target.id);
      		});
    	}, options);

    	document.querySelectorAll('.section').forEach((section) => {
			observer.observe(section);
    	});

    	return () => observer.disconnect();
  	}, []);

	useEffect(() => {
		document.getElementById(category).scrollIntoView({behavior: 'smooth'})
	}, [category])

	const localUI = {
		cart, setCart,
		leftDrawerOpened, setLeftDrawerOpened,
		rightDrawerOpened, setRightDrawerOpened,
		category, setCategory,
	}

	const categories = items.map((item) => item.category)

  	return (
    <Box pos={'relative'}>
		<ActionIcon variant="filled" size={'xl'} color='green' pos={'absolute'} bottom={45} right={15}
		radius={'xl'} onClick={() => setRightDrawerOpened(true)} style={{ zIndex: 2}}>
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
			<Group gap={1} onClick={() => setLeftDrawerOpened(true)} style={{ cursor: 'pointer'}}>
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
      	<Drawer opened={leftDrawerOpened} title="Categories" position="left"
		onClose={() => setLeftDrawerOpened(false)}>
        	<Stack>
          	{categories.map((cat, i) => (
            	<Button variant="subtle" fullWidth key={i} onClick={() => setCategory(cat)}>{cat}</Button>
          	))}
        	</Stack>
			<Divider mt={'sm'} mb={'sm'} />
			<Stack>
				<Button component='a' variant='filled' color='orange' href='/' w={'fit-content'} m={'auto'} >Home</Button>
			</Stack>
      	</Drawer>

      	{/* Right Drawer - Cart */}
      	<Drawer opened={rightDrawerOpened} title="Cart" position="right"
		onClose={() => setRightDrawerOpened(false)}>
        	<Stack>
          	{cart.length === 0 ? (<Text size="sm" c="dimmed">No items in cart.</Text>) : (
            	cart.map((item, i) => (
              		<Group key={i} justify="space-between">
                		<Text size="sm">{item.name}</Text>
                		<Text size="xs" c="dimmed">{item.price}</Text>
              		</Group>
            	))
          	)}
          	{cart.length > 0 && <Button fullWidth mt="sm">Checkout</Button>}
        	</Stack>
      	</Drawer>
    </Box>
	);
}
