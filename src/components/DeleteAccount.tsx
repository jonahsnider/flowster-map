import {Box, Button, Heading} from '@chakra-ui/react';
import {deleteUser, signInWithPopup} from 'firebase/auth';
import {deleteDoc, doc} from 'firebase/firestore';
import React from 'react';
import {auth, authProvider, db} from '../firebase';

async function deleteAccount() {
	if (!auth.currentUser) {
		throw new TypeError('You are not logged in');
	}

	// A lazy way to reprompt for credentials so deletion can succeed https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
	await signInWithPopup(auth, authProvider);

	await deleteDoc(doc(db, 'users', auth.currentUser.uid));

	await deleteUser(auth.currentUser);
}

const DeleteAccount: React.VFC = () => {
	const [isLoading, setLoading] = React.useState(false);

	return (
		<Box my={4}>
			<Heading size='lg' mb={2}>
				Delete account
			</Heading>

			<Button
				colorScheme='red'
				isLoading={isLoading}
				onClick={async () => {
					setLoading(true);
					deleteAccount().finally(() => {
						setLoading(false);
					});
				}}
			>
				Delete account
			</Button>
		</Box>
	);
};

export default DeleteAccount;
