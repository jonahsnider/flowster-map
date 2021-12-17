import React from 'react';
import {useRouter} from 'next/router';
import AuthContext from '../contexts/AuthContext';

const NeedsAuth: React.FC = ({children}) => {
	const router = useRouter();

	return (
		<AuthContext.Consumer>
			{user => {
				if (user === null) {
					if (router.isReady) {
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						router.push('/');
					}

					return null;
				}

				return children;
			}}
		</AuthContext.Consumer>
	);
};

export default NeedsAuth;
