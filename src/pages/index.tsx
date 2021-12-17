import type {NextPage} from 'next';
import React from 'react';
import type {Query} from 'firebase/firestore';
import {collection, onSnapshot, query} from 'firebase/firestore';
import {useRouter} from 'next/router';
import type {User} from 'firebase/auth';
import NextLink from 'next/link';
import {Box, Button, Center, Heading, Link} from '@chakra-ui/react';
import SignInButton from '../components/AuthButton';
import AuthContext from '../contexts/AuthContext';
import {db} from '../firebase';
import type {Models} from '../backend';
import ContentWrapper from '../components/ContentWrapper';

const SignedIn: React.FC<{userCount: number; user: User}> = props => {
	return (
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
	const router = useRouter();

	return (
		<SignInButton colorScheme='blue' size='lg' onSuccess={async () => router.push('/map')}>
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
