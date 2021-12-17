import {Box, Heading, Text} from '@chakra-ui/react';
import type {NextPage} from 'next';
import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import DeleteAccount from '../components/DeleteAccount';
import NeedsAuth from '../components/NeedsAuth';
import UpdateAccount from '../components/UpdateAccount';

const HomePage: NextPage = () => {
	return (
		<NeedsAuth>
			<ContentWrapper main>
				<Box my={8}>
					<Heading>Account</Heading>
					<Text>Update or delete your account here.</Text>
				</Box>

				<Box my={8}>
					<UpdateAccount />
				</Box>

				<Box my={8}>
					<DeleteAccount />
				</Box>
			</ContentWrapper>
		</NeedsAuth>
	);
};

export default HomePage;
