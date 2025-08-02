import { Modal, Stack, Text, Box, Group, ScrollArea, Center, Title, Button } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useState, } from 'react';

// import iconMap from './IconMap';

function handleSubmit(ui={}, data={}) {

	//alert(`${ui.username} and ${ui.avatar} and ${ui.bio}`)
	fetch('http://localhost:5000/update', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			playlist: ui.favPlaylist,
			song: ui.favSong,
		}),
	}).then(res => {
		if (res.ok) {
			ui.Load(true);
            ui.OpenPlaylists(false);
		}
	}).catch(() => {
		ui.SetPlaylist(data.playlist);
		ui.setSong(data.song);
	});
}

function Playlist({ui = {}, title={}, songs=[] }) {
    function capitalize(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    return (
    <Box display='flex' mt='xs' mb='xs' bdrs={10} p={3}
    onClick={() => { ui.PickSong(songs) }}
    onDoubleClick={window.matchMedia('(pointer: coarse)').matches ? () => {} : () => ui.SetPlaylist(title)}
    onContextMenu={window.matchMedia('(pointer: coarse)').matches ? () => ui.SetPlaylist(title) : () => {}}
    style={{
        backgroundColor: '#f8fdffff', cursor: 'pointer',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow:
        `inset 0 -2px 0 #ffffff,
        0 2px 4px rgba(0, 0, 0, 0.15)`,
    }}>
        <Stack p='xs' w='100%' bdrs={10} pos='relative' style={{ backgroundColor: '#c4e1fcff', }}>
            <Group spacing="sm">
                {/* {typeof playlist.icon === 'string' && iconMap[playlist.icon] ? 
                 (() => {
                    const IconComponent = iconMap[playlist.icon];
                    return IconComponent ? <IconComponent size={24} /> : null;
                })()
                : playlist.icon} */}
                <Text c='#290dddff' ff='sans-serif' fw={900}>{capitalize(title)}</Text>
            </Group>
            {title === ui.favPlaylist && (<IconCheck style={{
                zIndex: 2, color: 'green',
                position: 'absolute', right: 0,
            }} />)}
        </Stack>
    </Box>
    );
}

function PlaylistsDropDown({ ui = {}, playlists = {}, data = {} }) {
    return (
    <Stack p="xs" bdrs="lg" w='100%' gap='xs' style={{
        background: 'linear-gradient(to bottom, #d2ebff, #a2c4ff)',
        border: '3px solid #1a629cff',
    }}>
        <Center><Title order={3} style={{ textShadow: '1px 1px #3772ff' }}>Playlists</Title></Center>
        <Text align="center" c='#080aa0ff' size="xs" fw={900}>
			Choose your favourite songs to listen to while playing
		</Text>
        <ScrollArea p="xs" h='fit-content' mah={400} bdrs={12} scrollbars="y" style={{ backgroundColor: '#d3eaff', }}>
            {Object.entries(playlists).map(([title, songs], i) => (
                <Playlist ui={ui} title={title} songs={songs} key={i} />
            ))}
        </ScrollArea>
        <Center><Button onClick={() => handleSubmit(ui, data)}>Save</Button></Center>
    </Stack>
    );
}

export default function Playlists({ ui = {}, playlists = {}, data = {} }) {
    const [pickSong, PickSong] = useState([]);
    const [favPlaylist, SetPlaylist] = useState(data.playlist);
    const [favSong, SetSong] = useState(data.song)

    const localUI = {
        ...ui,
        pickSong, PickSong,
        favPlaylist, SetPlaylist,
        favSong, SetSong,
    };
    
    return (
    <>
    <Modal centered withCloseButton={false} radius="lg" padding={0} overlayProps={{ opacity: 0.6 }}
    opened={ui.openPlaylists} onClose={() => ui.OpenPlaylists(false)} size="xs">
        <PlaylistsDropDown ui={localUI} playlists={playlists} data={data} />
    </Modal>
    </>
    );
}
