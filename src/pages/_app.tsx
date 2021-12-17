import {ChakraProvider} from '@chakra-ui/react';
import {Wrapper} from '@googlemaps/react-wrapper';
import type {User} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';
import type {AppProps} from 'next/app';
import 'normalize.css';
import React from 'react';
import NavBar from '../components/NavBar';
import {API_KEYS} from '../config';
import AuthContext from '../contexts/AuthContext';
import {auth} from '../firebase';
import './globals.css';

const MyApp = ({Component, pageProps}: AppProps) => {
	const [user, setUser] = React.useState<User | undefined | null>(undefined);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user);
		});

		return unsubscribe;
	}, []);

	return (
		<ChakraProvider>
			<AuthContext.Provider value={user}>
				<header>
					<NavBar />
				</header>

				<Wrapper apiKey={API_KEYS.GOOGLE_MAPS} libraries={['places']}>
					<Component {...pageProps} />
				</Wrapper>
			</AuthContext.Provider>
		</ChakraProvider>
	);
};

export default MyApp;
