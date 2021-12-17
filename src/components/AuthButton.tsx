import type {ButtonProps} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import {signInWithPopup} from 'firebase/auth';
import React from 'react';
import {FaGoogle} from 'react-icons/fa';
import {auth, authProvider} from '../firebase';

export interface Props extends ButtonProps {
	onSuccess?: () => void | unknown | undefined;
}

const SignInButton: React.FC<Props> = ({onSuccess, children, ...buttonProps}) => {
	const [didPopupOpen, setPopupOpen] = React.useState(false);

	const signIn: React.MouseEventHandler<HTMLButtonElement> = async event => {
		event.preventDefault();

		setPopupOpen(true);

		signInWithPopup(auth, authProvider)
			.then(() => {
				setPopupOpen(false);
				onSuccess?.();
			})
			.catch(() => {
				setPopupOpen(false);
			});
	};

	return (
		<Button type='button' isLoading={didPopupOpen} leftIcon={<FaGoogle />} onClick={signIn} {...buttonProps}>
			{children ?? 'Sign in with Google'}
		</Button>
	);
};

export default SignInButton;
