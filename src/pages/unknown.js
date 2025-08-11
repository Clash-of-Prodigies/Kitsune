import { Button, Container, Image, SimpleGrid, Text, Title, Box } from '@mantine/core';
import image from '../media/unknown.svg';
import classes from '../styles/unknown.module.css';

export default function Unknown() {
	return (
    <Container className={classes.root}>
		<SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
			<Image src={image} className={classes.mobileImage} />
			<Box>
				<Title className={classes.title}>Something is not right...</Title>
				<Text c="dimmed" size="lg">
					Page you are trying to open does not exist. You may have mistyped the address, or the
					page has been moved to another URL. If you think this is an error contact support.
          		</Text>
          		<Button variant="outline" size="md" mt="xl" className={classes.control}>
					Get back to home page
          		</Button>
        	</Box>
        	<Image src={image} className={classes.desktopImage} />
      	</SimpleGrid>
    </Container>
	);
}