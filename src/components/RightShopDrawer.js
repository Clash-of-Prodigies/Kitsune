import { useMemo } from 'react';
import { Drawer, Stack, Group, Paper, Text, Divider, Badge, ActionIcon, } from '@mantine/core';
import { Button, ScrollArea, TextInput, Box, Avatar, Tooltip, } from '@mantine/core';
import { IconTrash, IconMinus, IconPlus, IconCoin, IconTicket, IconShoppingBag } from '@tabler/icons-react';
import IconOrImage from './IconMap';
import axios from 'axios';

async function Checkout( ui = {}, cart = []) {
	let res = {}
	try {
		res = await axios.post('http://localhost:5000/shop/checkout',
			cart,
		);
		alert(res.data.message);
		ui.Load(true);
	} catch (error) {
		alert(error);
	} finally {
		
	}
}

function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
	const { coin, ticket } = item.price;
	const qty = item.qty ?? 1;
	
	return (
	<Paper withBorder radius="md" p="sm" style={{
        background: 'linear-gradient(180deg, #eef6ff 0%, #e8efff 100%)',
        borderColor: '#d9e7ff',
    }}>
		<Group justify="space-between" align="center" wrap="nowrap">
			<Group gap="sm" wrap="nowrap">
				<Avatar size="lg" radius="xl" color="blue">{IconOrImage(item.icon)}</Avatar>
          		<Box>
            		<Text fw={700} size="sm">{item.name}</Text>
            		<Group gap={8} mt={4}>
              			{coin && <Badge color="yellow" leftSection={<IconCoin size={12} />}>{coin}</Badge>}
              			{ticket && <Badge color="pink" leftSection={<IconTicket size={12} />}>{ticket}</Badge>}
            		</Group>
          		</Box>
        	</Group>

        	<Group gap="xs" align="center" wrap="nowrap">
          		<ActionIcon variant="light" onClick={onDecrease} aria-label="Decrease">
            		<IconMinus size={16} />
          		</ActionIcon>
          		<Text fw={700} w={24} ta="center">{qty}</Text>
          		<ActionIcon variant="light" onClick={onIncrease} aria-label="Increase">
            		<IconPlus size={16} />
          		</ActionIcon>

          		<Tooltip label="Remove">
            		<ActionIcon variant="subtle" color="red" onClick={onRemove} aria-label="Remove">
              			<IconTrash size={16} />
            		</ActionIcon>
          		</Tooltip>
        	</Group>
      	</Group>
    </Paper>
	);
}

export default function RightDrawer({ ui = {}, }) {
	const cart = useMemo(() => {
		if (!ui.cart) return []
		return ui.cart
	}, [ui.cart]);

    const cartSafe = useMemo(() => cart.map(
        (it) => ({ ...it, qty: typeof it.qty === 'number' ? it.qty : 1 })
    ), [cart]);

  	const totals = useMemo(() => {
		return cartSafe.reduce((acc, item) => {
			const { coin, ticket } = item.price;
			acc.coin += (coin || 0) * (item.qty ?? 1);
			acc.ticket += (ticket || 0) * (item.qty ?? 1);
			return acc;
		},
		{ coin: 0, ticket: 0 });
  	}, [cartSafe]);

  	const updateQty = (idx, delta) => { ui.setCart((prev) => { prev.map((it, i) => (
		i === idx ? { ...it, qty: Math.max(1, (it.qty ?? 1) + delta) } : it));
    	});
  	};
  	const removeItem = (idx) => { ui.setCart((prev) => prev.filter((_, i) => i !== idx)) };
	const clearCart = () => ui.setCart([]);

  	return (
    <Drawer opened={ui.rightDrawer} onClose={ui.OpenRightDrawer} position="right" size="md"
	withCloseButton={false} styles={{
        content: {
			background: 'linear-gradient(180deg, #eaf3ff 0%, #f4f7ff 100%)',
			borderLeft: '1px solid #dbe7ff',
        },
    }}>
      {/* Header */}
      	<Paper radius="md" p="md" withBorder mb="md" style={{
			background: 'linear-gradient(180deg,#dff0ff,#e9edff)'
		}}>
			<Group justify="space-between" align="center">
				<Group gap="xs">
					<IconShoppingBag size={18} />
            		<Text fw={800}>Your Cart</Text>
          		</Group>
          		<Group gap="sm">
            		<Badge size="lg" color="yellow" leftSection={<IconCoin size={14} />}>
              		{totals.coin.toLocaleString()}
            		</Badge>
            		<Badge size="lg" color="pink" leftSection={<IconTicket size={14} />}>
              		{totals.ticket.toLocaleString()}
            		</Badge>
          		</Group>
        	</Group>
      	</Paper>

      	{/* Body */}
      	<Stack gap="xl" >
        	<ScrollArea h={225} type="auto" scrollbars="y">
          		<Stack gap="sm">
            	{cartSafe.length === 0 ? (
              		<Paper withBorder p="lg" radius="md" ta="center" style={{ background: '#ffffffaa' }}>
                		<IconShoppingBag size={28} />
                		<Text mt="xs" c="dimmed" size="sm">Your cart is empty.</Text>
              		</Paper>
            	):(
					cartSafe.map((item, i) => (
						<CartItemRow key={`${item.name}-${i}`} item={item}
						onIncrease={() => updateQty(i, +1)} onDecrease={() => updateQty(i, -1)}
						onRemove={() => removeItem(i)} />
					))
				)}
          		</Stack>
        	</ScrollArea>

        	<Divider />

        	{/* Promo + Totals */}
        	<Stack gap="xs">
          		<TextInput placeholder="Promo / Gift code" radius="md" />
          		<Group justify="space-between">
            		<Text c="dimmed">Items</Text>
            		<Text fw={700}>{cartSafe.length}</Text>
          		</Group>
          		<Group justify="space-between">
            		<Text c="dimmed">Total Coins</Text>
            		<Text fw={700}>{totals.coin.toLocaleString()}</Text>
          		</Group>
          		<Group justify="space-between">
            <		Text c="dimmed">Total Tickets</Text>
            		<Text fw={700}>{totals.ticket.toLocaleString()}</Text>
          		</Group>
        	</Stack>
      	</Stack>

      	{/* Sticky footer */}
      	<Box mt="md" p="md" style={{
			position: 'sticky', bottom: 0, left: 0, right: 0,
			background: 'linear-gradient(180deg, #e9efff 0%, #dde9ff 100%)',
			borderTop: '1px solid #d0dcff', borderRadius: 12,
        }}>
			<Group justify="space-between" align="center">
          		<Group gap="sm" justify='space-evenly'>
					<Button radius="xl" color="gray" onClick={clearCart}>Clear cart</Button>
            		<Button radius="xl" onClick={() => Checkout(ui, cartSafe)}
              		disabled={cartSafe.length === 0}>Proceed to checkout</Button>
          		</Group>
        	</Group>
      	</Box>
    </Drawer>
  	);
}
