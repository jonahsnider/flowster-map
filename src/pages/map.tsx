import {Box, Heading, Text} from '@chakra-ui/react';
import type {Query} from 'firebase/firestore';
import {collection, onSnapshot, query} from 'firebase/firestore';
import type {NextPage} from 'next';
import React from 'react';
import type {Models} from '../backend';
import ContentWrapper from '../components/ContentWrapper';
import UserMap from '../components/Map';
import NeedsAuth from '../components/NeedsAuth';
import {db} from '../firebase';

const UserMapPage: NextPage = () => {
	const [users, setUsers] = React.useState<readonly Models.User[]>([]);

	React.useEffect(() => {
		const userQuery = query(collection(db, 'users')) as Query<Models.User>;
		const unsubscribe = onSnapshot(userQuery, querySnapshot => {
			setUsers(querySnapshot.docs.map(doc => doc.data()));
		});

		return unsubscribe;
	}, []);

	return (
		<NeedsAuth>
			<ContentWrapper main>
				<Heading>Map</Heading>
				<Text>This is a map of all the Flowsters across the globe. You can click on a marker to see more information about them.</Text>
			</ContentWrapper>

			<Box w='100%' h='100vh'>
				<UserMap users={users} />
			</Box>
		</NeedsAuth>
	);
};

export default UserMapPage;
