import {Box, Button, Center, Heading, Link} from '@chakra-ui/react';
import type {User} from 'firebase/auth';
import type {Query} from 'firebase/firestore';
import {collection, doc, onSnapshot, query} from 'firebase/firestore';
import type {NextPage} from 'next';
import NextLink from 'next/link';
import React from 'react';
import type {Models} from '../backend';
import SignInButton from '../components/AuthButton';
import ContentWrapper from '../components/ContentWrapper';
import AuthContext from '../contexts/AuthContext';
import {db} from '../firebase';

const SignedIn: React.FC<{userCount: number; user: User}> = props => {
	const [isMissingLocation, setMissingLocation] = React.useState(false);

	React.useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'users', props.user.uid), doc => {
			setMissingLocation(!doc.exists());
		});

		return unsubscribe;
	}, []);

	return isMissingLocation ? (
		<Box m={8}>
			<Center>
				<NextLink passHref href='/account'>
					<Button as={Link} size='lg' colorScheme='red' _hover={{textDecoration: 'none'}}>
						Please set your location before continuing
					</Button>
				</NextLink>
			</Center>
		</Box>
	) : (
		<Box>
			<Heading mb={8}>Welcome back {props.user.displayName}</Heading>

			<Center>
				<NextLink passHref href='/map'>
					<Button as={Link} size='lg' colorScheme='blue' _hover={{textDecoration: 'none'}}>
						View {props.userCount - 1} other Flowsters on the map
					</Button>
				</NextLink>
			</Center>
		</Box>
	);
};

const SignedOut: React.FC<{userCount: number}> = props => {
	return (
		<SignInButton colorScheme='blue' size='lg'>
			Sign in to view {props.userCount} Flowsters on the map
		</SignInButton>
	);
};

const HomePage: NextPage = () => {
	const [userCount, setUserCount] = React.useState(0);

	React.useEffect(() => {
		const userQuery = query(collection(db, 'users')) as Query<Models.User>;
		const unsubscribe = onSnapshot(userQuery, querySnapshot => {
			setUserCount(querySnapshot.size);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Consumer>
			{user => (
				<ContentWrapper main>
					<Center h='container.md'>{user ? <SignedIn userCount={userCount} user={user} /> : <SignedOut userCount={userCount} />}</Center>
				</ContentWrapper>
			)}
		</AuthContext.Consumer>
	);
};

export default HomePage;
