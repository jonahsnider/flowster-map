import {ChakraProvider} from '@chakra-ui/react';
import {Wrapper} from '@googlemaps/react-wrapper';
import type {User} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';
import {DefaultSeo} from 'next-seo';
import type {AppProps} from 'next/app';
import 'normalize.css';
import React from 'react';
import NavBar from '../components/NavBar';
import {API_KEYS, APP_URL} from '../config';
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
			<DefaultSeo
				titleTemplate='%s | Flowster Map'
				description='View a live-updating map to see where all your fellow Flowsters are based.'
				openGraph={{
					type: 'website',
					// eslint-disable-next-line @typescript-eslint/naming-convention
					site_name: 'Flowster Map',
					url: APP_URL,
					locale: 'en_US',
				}}
			/>

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
